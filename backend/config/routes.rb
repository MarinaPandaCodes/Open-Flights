Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      # Airlines routes - using ID
      resources :airlines do
        resources :reviews, only: [:create, :index]
        resources :bookings, only: [:index, :show, :create, :update, :destroy] # nested for airline-specific bookings
        get 'booking_stats', on: :member
      end

      # Bookings routes that are not tied to airline (update/destroy)
      resources :bookings, only: [:index, :show, :update, :destroy]
       resources :reviews, only: [:show, :update, :destroy]

      # Auth routes
      post "login", to: "auth#login"
      post "signup", to: "auth#signup"

      # Standalone reviews
      resources :reviews, only: [:show, :update, :destroy]
    end
  end

  # Catch-all route for frontend
  get '*path', to: 'pages#index', via: :all
end
