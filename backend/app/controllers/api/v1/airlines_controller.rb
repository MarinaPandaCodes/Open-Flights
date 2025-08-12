module Api
  module V1
    class AirlinesController < ApplicationController
      before_action :set_airline, only: [:show, :update, :destroy, :booking_stats]

      # GET /api/v1/airlines
      def index
        airlines = Airline.left_joins(:bookings)
                         .includes(:reviews)
                         .select('airlines.*, COUNT(bookings.id) AS bookings_count')
                         .group('airlines.id')
                         .order('bookings_count DESC')

        render json: serialize_airlines(airlines)
      rescue StandardError => e
        Rails.logger.error "Error in airlines#index: #{e.message}\n#{e.backtrace.join("\n")}"
        render json: { error: "Failed to load airlines", details: e.message }, status: :internal_server_error
      end

      # GET /api/v1/airlines/:id
      def show
        render json: serialize_airline(@airline, include: [:reviews])
      rescue StandardError => e
        Rails.logger.error "Airline show serialization error: #{e.message}\n#{e.backtrace.join("\n")}"
        render json: { error: e.message }, status: :internal_server_error
      end

      # GET /api/v1/airlines/:id/booking_stats
      def booking_stats
        stats = {
          total_bookings: @airline.bookings.count,
          monthly_bookings: @airline.bookings.group_by_month(:created_at).count,
          cabin_distribution: @airline.bookings.group(:cabin_class).count
        }
        render json: { data: stats }
      rescue => e
        Rails.logger.error "Booking stats error: #{e.message}"
        render json: { error: 'Failed to load booking stats' }, status: :internal_server_error
      end

      # POST /api/v1/airlines
      def create
        @airline = Airline.new(airline_params)
        if @airline.save
          render json: serialize_airline(@airline), status: :created
        else
          render_error(@airline)
        end
      end

      # PATCH/PUT /api/v1/airlines/:id
      def update
        if @airline.update(airline_params)
          render json: serialize_airline(@airline, include: [:reviews])
        else
          render_error(@airline)
        end
      end

      # DELETE /api/v1/airlines/:id
      def destroy
        if @airline.destroy
          head :no_content
        else
          render_error(@airline)
        end
      end

      private

      # Change here: find airline by ID, not slug
      def set_airline
        @airline = Airline.includes(:reviews, :bookings).find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Airline not found' }, status: :not_found
      end

      def airline_params
        params.require(:airline).permit(
          :name, :image_url, :country,
          :description, :headquarters, :established_year,
          :slug # optional
        )
      end

      def serialize_airline(airline, options = {})
        options[:meta] ||= {}
        begin
          options[:meta].merge!({
            reviews_count: airline.reviews.size,
            avg_score: airline.avg_score
          })
        rescue => e
          Rails.logger.error "Error adding meta to airline serialization: #{e.message}"
        end
        AirlineSerializer.new(airline, options).serializable_hash
      end

      def serialize_airlines(airlines, options = {})
        options[:meta] ||= {}
        AirlineSerializer.new(airlines, options).serializable_hash
      end

      def render_error(resource)
        render json: { errors: resource.errors.full_messages, details: resource.errors.details }, status: :unprocessable_entity
      end
    end
  end
end
