Rails.application.routes.draw do

  namespace :api do
    resources :menu_items
    resources :orders
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
