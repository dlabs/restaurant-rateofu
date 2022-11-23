require 'rails_helper'

RSpec.describe "Orders", type: :request do
  describe "GET /orders" do
    it "returns http success" do
      get "/api/orders"
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to be_empty
    end

    it "returns few orders" do
      get "/api/orders"
      expect(JSON.parse(response.body)).to eq([])

      2.times { create(:order_item) }
      get "/api/orders"
      expect(JSON.parse(response.body).length).to eq(2)
    end

    describe "GET /orders?has_unfinished_items=true" do
      it "returns only unfinished items" do
        3.times { create(:order_item) }
        order = OrderItem.last
        order.status = OrderItem::Status::Delivered
        order.save
        get "/api/orders"
        expect(JSON.parse(response.body).size).to eq(3)
        get "/api/orders?has_unfinished_items=true"
        expect(JSON.parse(response.body).size).to eq(2)

      end
    end
  end

  describe "POST /orders" do
    it "saves ordered items to the db" do
      item_1 = create(:item)
      item_2 = create(:item)
      hsh = {
        table_id: "table_1",
        items: [
          { item_id: item_1.id, quantity: 1},
          { item_id: item_2.id, quantity: 6}
        ]
      }

      expect(OrderItem.all.count).to eq(0)
      post "/api/orders", params: hsh
      expect(response).to have_http_status(:created)
      expect(OrderItem.all.count).to eq(2)
      expect(OrderItem.all.map(&:quantity).sum).to eq(7)
    end
  end



  describe "GET /orders/:id" do
    it "saves ordered items to the db" do
      item_1 = create(:item)
      item_2 = create(:item)
      hsh = {
        table_id: "table_1",
        items: [
          { item_id: item_1.id, quantity: 1},
          { item_id: item_2.id, quantity: 6}
        ]
      }

      expect(Order.all.count).to eq(0)
      post "/api/orders", params: hsh
      expect(Order.all.count).to eq(1)
      order = Order.first
      get "/api/orders/#{order.id}"
      body = JSON.parse(response.body)
      expect(body["order_id"]).to eq(order.id)
      expect(body["order_items"].size).to eq(2)
    end
  end

  describe "PUT /order-items/:id" do
    it "saves ordered items to the db" do
      item_1 = create(:item)
      item_2 = create(:item)
      hsh = {
        table_id: "table_1",
        items: [
          { item_id: item_1.id, quantity: 1},
          { item_id: item_2.id, quantity: 6}
        ]
      }
      # both of the items should have status "ordered"
      # update one item to "preparing" and "ready_to_serve"

      post "/api/orders", params: hsh
      expect(OrderItem.all.map(&:status)).to eq(["ordered", "ordered"])

      order_item_1 = OrderItem.first
      order_item_2 = OrderItem.second
      put "/api/order-items/#{order_item_1.id}", params: { orderItemId: order_item_1.id, status: OrderItem::Status::ReadyToServe }
      expect(OrderItem.all.map(&:status)).to match_array(["ready_to_serve", "ordered"])
      put "/api/order-items/#{order_item_2.id}", params: { orderItemId: order_item_2.id, status: OrderItem::Status::Preparing }
      expect(OrderItem.all.map(&:status)).to match_array(["ready_to_serve", "preparing"])
    end
  end

end
