require "rails_helper"

RSpec.describe "Order Items management" do
  context "updation" do
    it "returns a json response with correct status when successful" do
      allow(OrderItem).to receive(:find).and_return(OrderItem.new)
      allow_any_instance_of(OrderItem).to receive(:update!).and_return(true)
      allow_any_instance_of(ApplicationController).to receive(:authorized).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      put "/api/order-items/e95321ac-f0d5-4009-8420-da8fc17c7731", params: {
        orderItemId: "e95321ac-f0d5-4009-8420-da8fc17c7731"
      },
      headers: headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(200)
    end

    it "returns a json response with correct status when unsuccessful" do
      allow(OrderItem).to receive(:find).and_return(OrderItem.new)
      allow_any_instance_of(OrderItem).to receive(:update!).and_return(false)
      allow_any_instance_of(ApplicationController).to receive(:authorized).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      put "/api/order-items/e95321ac-f0d5-4009-8420-da8fc17c7731", params: {
        orderItemId: "e95321ac-f0d5-4009-8420-da8fc17c7731"
      },
      headers: headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
