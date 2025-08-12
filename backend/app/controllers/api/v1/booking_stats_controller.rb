# app/controllers/api/v1/booking_stats_controller.rb
module Api
  module V1
    class BookingStatsController < ApplicationController
      def show
        airline = Airline.find(params[:airline_id])
        
        # Basic stats
        total_bookings = airline.bookings.count
        monthly_bookings = airline.bookings
                                .group_by_month(:created_at, format: "%b %Y")
                                .count
        
        # Cabin class distribution
        cabin_distribution = airline.bookings
                                  .group(:cabin_class)
                                  .count
                                  .transform_keys(&:titleize)
        
        render json: {
          data: {
            total_bookings: total_bookings,
            monthly_bookings: monthly_bookings,
            cabin_distribution: cabin_distribution,
            average_passengers: airline.bookings.average(:passengers).to_f.round(1)
          }
        }
      end
    end
  end
end