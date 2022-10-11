Rails.application.routes.draw do

  namespace :api do
    resources :menu_items
    resources :orders
    resources :order_items
    # post 'authenticate', to: 'authentication#authenticate'
    post 'login', to: 'authentication#authenticate'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
