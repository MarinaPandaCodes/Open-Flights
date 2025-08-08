# app/controllers/api/v1/auth_controller.rb

module Api
  module V1
    class AuthController < ApplicationController
      
      # 🔐 POST /api/v1/login
      def login
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          # Generate JWT token with user_id and expiration (24 hours)
          payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
          secret = Rails.application.credentials.secret_key_base

          token = JWT.encode(payload, secret, 'HS256')

          render json: {
            status: 'success',
            message: 'Logged in successfully',
            data: {
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
              },
              token: token
            }
          }, status: :ok
        else
          render json: {
            status: 'error',
            message: 'Invalid email or password'
          }, status: :unauthorized
        end
      end

      # 📝 POST /api/v1/signup
      def signup
        user = User.new(user_params)
        puts "Assigned Role: #{user.role}"  # Debug output

        if user.save
          render json: {
            status: "success",
            message: "User created successfully",
            data: {
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
              }
            }
          }, status: :created
        else
          render json: {
            status: "error",
            errors: user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        # ✅ Ensure frontend sends: { "user": { name, email, password, role... } }
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
      end
    end
  end
end
