require 'rails_helper'

RSpec.describe Api::V1::Clients::OrdersController, type: :request do
  describe 'GET #index' do
    before { create_list(:order, 3) }
    it 'returns a list of orders' do
      get '/api/v1/clients/orders', xhr: true
      expect(response).to have_http_status(200)
    end

    it 'returns a list of orders with has_unfinished_items' do
      Order.last.order_items.update_all(status: :ready_to_serve)

      params = { has_unfinished_items: true }
      get api_v1_clients_orders_path, params:, xhr: true
    end
  end

  describe 'GET #show' do
    before { @order = create(:order) }
    it 'returns an order' do
      get api_v1_clients_order_path(@order), xhr: true
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #create' do
    it 'creates a new order' do
      table = create(:table)
      params = {
        table_id: table.id,
        items: [
          { item_id: create(:item).id, quantity: 1 }
        ]
      }

      post '/api/v1/clients/orders', params:, xhr: true

      expect(response).to have_http_status(200)
      expect(Order.count).to eq(1)
    end
  end
end
