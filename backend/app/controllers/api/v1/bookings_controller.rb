class Api::V1::BookingsController < ApplicationController
  before_action :authenticate_user_jwt

  def create
    booking = @current_user.bookings.new(booking_params)
    
    if booking.save
      render json: { 
        data: booking.as_json(include: { airline: { only: [:name] } }) 
      }, status: :created
    else
      render json: { 
        error: booking.errors.full_messages.join(", ") 
      }, status: :unprocessable_entity
    end
  rescue => e
    Rails.logger.error "Booking creation failed: #{e.message}\n#{e.backtrace.join("\n")}"
    render json: { 
      error: "Failed to create booking. Please try again." 
    }, status: :internal_server_error
  end

  def index
    bookings = @current_user.bookings.includes(:airline)
    render json: bookings.as_json(include: { airline: { only: [:name] } })
  end

  private

  def authenticate_user_jwt
    header = request.headers['Authorization']
    unless header
      render json: { error: "Authorization header missing" }, status: :unauthorized
      return
    end

    token = header.split(' ').last
    unless token
      render json: { error: "Token missing" }, status: :unauthorized
      return
    end

    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      @current_user = User.find(decoded[0]['user_id'])
      
      # For debugging:
      Rails.logger.info "Authenticated user: #{@current_user.email}"
    rescue JWT::DecodeError => e
      Rails.logger.error "JWT Decode Error: #{e.message}"
      render json: { error: "Invalid token" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error "User not found: #{e.message}"
      render json: { error: "User not found" }, status: :unauthorized
    end
  end

  def booking_params
    params.require(:booking).permit(
      :airline_id,
      :departure_date,
      :departure_time,
      :passengers,
      :cabin_class,
      :origin,
      :destination,
      :return_date,
      :special_requests
    )
  end
end