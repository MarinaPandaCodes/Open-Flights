class Api::V1::BookingsController < ApplicationController
  before_action :authenticate_user_jwt
  before_action :set_airline, only: [:create, :index, :show, :update, :destroy]
  before_action :set_booking, only: [:show, :update, :destroy]

  # GET /api/v1/airlines/:airline_id/bookings or /api/v1/bookings
  def index
    if @airline
      bookings = @current_user.bookings.where(airline: @airline).includes(:airline)
    else
      bookings = @current_user.bookings.includes(:airline)
    end

    render json: bookings.as_json(include: { airline: { only: [:name] } })
  end

  # GET /api/v1/airlines/:airline_id/bookings/:id or /api/v1/bookings/:id
  def show
    render json: @booking
  end

  # POST /api/v1/airlines/:airline_id/bookings
  def create
    booking = @current_user.bookings.new(booking_params)
    booking.airline = @airline if @airline.present?
    booking.status ||= 'CONFIRMED' # Default status
    booking.amount ||= calculate_amount(booking) # Only calculate if not provided

    if booking.save
      render json: booking, status: :created
    else
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/airlines/:airline_id/bookings/:id or /api/v1/bookings/:id
  def update
    if @booking.update(booking_params)
      render json: @booking
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/airlines/:airline_id/bookings/:id or /api/v1/bookings/:id
  def destroy
  if @booking.update(status: 'CANCELED')
    render json: { message: "Booking cancelled" }, status: :ok
  else
    render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
  end
end


  private

  def set_airline
    if params[:airline_id]
      @airline = Airline.find(params[:airline_id])
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Airline not found" }, status: :not_found and return
  end

  def set_booking
    if params[:airline_id]
      @booking = @airline.bookings.find(params[:id])
    else
      @booking = @current_user.bookings.find(params[:id])
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Booking not found" }, status: :not_found and return
  end

  def authenticate_user_jwt
    header = request.headers['Authorization']
    if header.blank?
      render json: { error: "Authorization header missing" }, status: :unauthorized and return
    end

    token = header.split(' ').last
    if token.blank?
      render json: { error: "Token missing" }, status: :unauthorized and return
    end

    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      @current_user = User.find(decoded[0]['user_id'])
    rescue JWT::ExpiredSignature
      render json: { error: "Token expired" }, status: :unauthorized and return
    rescue JWT::DecodeError
      render json: { error: "Invalid token" }, status: :unauthorized and return
    rescue ActiveRecord::RecordNotFound
      render json: { error: "User not found" }, status: :unauthorized and return
    end
  end

  def booking_params
    params.require(:booking).permit(
      # :airline_id, # removed to prevent tampering, airline is set via URL param
      :departure_date,
      :return_date,
      :departure_time,
      :passengers,
      :cabin_class,
      :origin,
      :destination,
      :special_requests,
      :amount,
      :status
    )
  end

  def calculate_amount(booking)
    base_price = 1000
    class_multiplier = case booking.cabin_class
                       when 'economy' then 1
                       when 'premium_economy' then 1.5
                       when 'business' then 2
                       when 'first' then 3
                       else 1
                       end
    base_price * class_multiplier * booking.passengers
  end
end
