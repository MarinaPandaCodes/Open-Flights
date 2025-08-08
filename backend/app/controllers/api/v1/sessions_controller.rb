# app/controllers/api/v1/sessions_controller.rb
def create
  user = User.find_by(email: params[:email])

  if user&.authenticate(params[:password])
    token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.secrets.secret_key_base)
    render json: { token: token, role: user.role }, status: :ok
  else
    render json: { error: "Invalid email or password" }, status: :unauthorized
  end
end
