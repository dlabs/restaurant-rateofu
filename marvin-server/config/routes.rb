Rails.application.routes.draw do
  scope '/api' do
    resources :order_items, path: 'order-items'
    resources :menu_items, path: 'menu-items'
    resources :orders
    resource :login
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
