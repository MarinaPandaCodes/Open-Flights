module Api
  module V1
    class AirlinesController < ApplicationController
      before_action :set_airline, only: [:show, :update, :destroy]

      def index
        airlines = Airline.includes(:reviews).all
        render json: serialize_airlines(airlines, include: [:reviews])
      end

      def show
        render json: serialize_airline(@airline, include: [:reviews])
      end

      def create
        airline = Airline.new(airline_params)
        if airline.save
          render json: serialize_airline(airline), status: :created
        else
          render_error(airline)
        end
      end

      def update
        if @airline.update(airline_params)
          render json: serialize_airline(@airline, include: [:reviews])
        else
          render_error(@airline)
        end
      end

      def destroy
        if @airline.destroy
          head :no_content
        else
          render_error(@airline)
        end
      end

      private

      def set_airline
        @airline = Airline.includes(:reviews).find_by!(slug: params[:slug])
      end

      def airline_params
        params.require(:airline).permit(:name, :image_url, :description, :established_year, :headquarters, :country)
      end

      def serialize_airline(airline, options = {})
        AirlineSerializer.new(airline, options).serializable_hash
      end

      def serialize_airlines(airlines, options = {})
        AirlineSerializer.new(airlines, options).serializable_hash
      end

      def render_error(resource)
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
