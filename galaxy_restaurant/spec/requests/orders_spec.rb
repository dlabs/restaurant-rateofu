require "rails_helper"

RSpec.describe "Orders management" do
  context "creation" do
    it "returns a json formated response when successful" do
      allow_any_instance_of(Order).to receive(:save!).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      post "/api/orders", :params => {
        table_id: "a589d607-2843-4a35-9e49-753cabef71df",
        items: [
          { item_id: "e95321ac-f0d5-4009-8420-da8fc17c7731", quantity: 5 },
          { item_id: "e95321ac-f0d5-4009-8420-da8fc17c7731", quantity: 5 },
        ]
      },
      :headers => headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(:created)
    end

    it "returns a json formated response when unsuccessful" do
      allow_any_instance_of(Order).to receive(:save!).and_return(false)

      headers = { "ACCEPT" => "application/json" }

      post "/api/orders", :params => {
        table_id: "a589d607-2843-4a35-9e49-753cabef71df",
        items: [
          { item_id: "e95321ac-f0d5-4009-8420-da8fc17c7731", quantity: 5 },
          { item_id: "e95321ac-f0d5-4009-8420-da8fc17c7731", quantity: 5 },
        ]
      },
      :headers => headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  context "with unfinished items" do
    it "returns a json formated response when successful" do
      allow(Order).to receive(:with_unfinished_items).and_return(Order.new)
      allow_any_instance_of(ApplicationController).to receive(:authorized).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      get "/api/orders", :params => {
        has_unfinished_items: "true",
      },
      :headers => headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(200)
    end

    it "returns a json formated response when unsuccessful" do
      allow_any_instance_of(ApplicationController).to receive(:authorized).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      get "/api/orders", :params => {
        has_unfinished_items: "false",
      },
      :headers => headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(404)
    end
  end

  context "displaying one" do
    it "returns a json formated response when successful" do
      allow(Order).to receive(:find).and_return(build(:order))
      allow_any_instance_of(ApplicationController).to receive(:authorized).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      get "/api/orders/e95321ac-f0d5-4009-8420-da8fc17c7731", :params => {
        id: "e95321ac-f0d5-4009-8420-da8fc17c7731"
      },
      :headers => headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(200)
    end

    it "returns a json formated response when not found" do
      allow(Order).to receive(:find).and_return(false)
      allow_any_instance_of(ApplicationController).to receive(:authorized).and_return(true)

      headers = { "ACCEPT" => "application/json" }

      get "/api/orders/e95321ac-f0d5-4009-8420-da8fc17c7731", :params => {
        id: "e95321ac-f0d5-4009-8420-da8fc17c7731"
      },
      :headers => headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(404)
    end
  end
end
