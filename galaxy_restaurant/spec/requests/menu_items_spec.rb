require "rails_helper"

RSpec.describe "Order Items management" do
  context "returning a list of menu items" do
    let(:item_food) { build_stubbed(:item) }
    let(:item_drink) { build_stubbed(:item, kind: :drink) }

    it "returns a json formatted and serialized response" do
      allow(Item).to receive(:all).and_return([item_food, item_drink])

      headers = { "ACCEPT" => "application/json" }

      get "/api/menu-items", headers: headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(200)
      expect(response.body).to eq([
        {
          "item_id": item_food.id,
          "item_title": item_food.title,
          "item_price": item_food.price,
          "item_description": item_food.description,
          "item_type": item_food.kind,
          "item_image": item_food.image
        },
        {
          "item_id": item_drink.id,
          "item_title": item_drink.title,
          "item_price": item_drink.price,
          "item_description": item_drink.description,
          "item_type": item_drink.kind,
          "item_image": item_drink.image
        }
      ].to_json)
    end
  end
end
