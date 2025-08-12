module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :set_review, only: [:show, :update, :destroy]
      before_action :set_airline, only: [:create]
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      # GET /api/v1/reviews/:id
      def show
        render json: serialize_review(@review)
      end

      # POST /api/v1/airlines/:airline_id/reviews
      def create
        @review = @airline.reviews.new(review_params.merge(user_id: current_user.id))

        if @review.save
          render json: serialize_review(@review), status: :created
        else
          render_error(@review)
        end
      end

      # PATCH/PUT /api/v1/reviews/:id
      def update
        if @review.update(review_params)
          render json: serialize_review(@review)
        else
          render_error(@review)
        end
      end

      # DELETE /api/v1/reviews/:id
      def destroy
        @review.destroy
        head :no_content
      end

      private

      def set_review
        @review = Review.find(params[:id])
      end

      def set_airline
        # Try to find by ID first, then fall back to slug if needed
        @airline = Airline.find_by(id: params[:airline_id]) || 
                  Airline.find_by!(slug: params[:airline_id])
      end

      def review_params
        params.require(:review).permit(:title, :description, :score)
      end

      def serialize_review(review)
        ReviewSerializer.new(review).serializable_hash
      end

      def render_error(resource)
        render json: {
          errors: resource.errors.full_messages,
          details: resource.errors.details,
          fields: resource.errors.messages.keys
        }, status: :unprocessable_entity
      end

      def record_not_found
        render json: {
          error: "Resource not found",
          suggestion: "Please verify the identifier and try again",
          documentation_url: ENV['API_DOCS_URL'] || "https://your-api-docs.com/errors/not_found"
        }, status: :not_found
      end

      # TEMPORARY stub for current_user — replace with real auth method
      def current_user
        User.first
      end
    end
  end
end