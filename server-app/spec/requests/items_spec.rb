require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /menu-items" do
    it "returns menu items" do
      menu_items = [create(:item), create(:item)]
      get "/api/menu-items"
      expect(response).to have_http_status(:success)
      res = JSON.parse(response.body).map { |item| item["item_title"] }
      expect(res).to eq(["title_1", "title_2"])
    end
  end

end
