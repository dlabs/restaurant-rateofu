Rails.application.routes.draw do
  namespace :api do
    post '/login', to: 'authentication#login', as: :login
    namespace :v1 do
      namespace :clients do
        get '/menu-items', to: 'items#index'
        resources :orders, only: %i[index create show]
      end

      namespace :staff do
        get '/order-items/:id', to: 'order_items#show', as: :order_item
        put '/order-items/:id', to: 'order_items#update', as: :order_item_update
      end
    end
  end
end
