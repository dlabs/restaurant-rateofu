Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    post 'login', to: "sessions#new"

    get "menu-items", to: "items#index"

    get "orders", to: "orders#index"
    post "orders", to: "orders#create"
    get "orders/:id", to: "orders#show"
    put "order-items/:id", to: "orders#update"
  end
end
