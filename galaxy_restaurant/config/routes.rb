Rails.application.routes.draw do
  scope "/api" do
    get "/menu-items/", to: "menu_items#index"
    resources :orders, only: %i[show create index]
    post "/login", to: "authentication#login"
    put "/order-items/:id", to: "order_items#update"
  end
end
