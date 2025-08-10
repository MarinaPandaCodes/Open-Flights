Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug 
      resources :reviews, only: [:create, :update, :destroy]
      resources :bookings, only: [:create, :index]
     post "login", to: "auth#login"
     post "signup", to:"auth#signup"
     
    end
  end
  get '*path', to: 'pages#index', via: :all
  

end
