module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :set_review, only: [:update, :destroy]

      # POST /api/v1/reviews
      def create
        review = Review.new(review_params)
        if review.save
          render json: ReviewSerializer.new(review).serializable_hash, status: :created
        else
          render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/reviews/:id
      def update
        if @review.update(review_params)
          render json: ReviewSerializer.new(@review).serializable_hash, status: :ok
        else
          render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/reviews/:id
      def destroy
        if @review.destroy
          head :no_content
        else
          render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_review
        # If you don’t have authentication, use Review.find
        @review = Review.find_by(id: params[:id])
        render json: { error: "Review not found" }, status: :not_found unless @review
      end

      def review_params
        params.require(:review).permit(:title, :description, :score, :airline_id)
      end
    end
  end
end
