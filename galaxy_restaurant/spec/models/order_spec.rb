require "rails_helper"

RSpec.describe Order do
  let(:order) { create(:order, order_items: [order_item_drink, order_item_food]) }

  let(:food) { build(:item, kind: :food, price: 5) }
  let(:drink) { build(:item, title: "Sweet Tea", kind: :drink, price: 13.6) }

  let(:order_item_food) { build(:order_item, item: food) }
  let(:order_item_drink) { build(:order_item, item: drink) }

  context "#calculate_total_price" do
    it "should calculate order's total price" do
      expect(order.total.to_f).to eq 186.0
    end
  end

  context ".with_unfinished_items" do
    it "returns order" do
      expect(Order.with_unfinished_items).to match_array([order])
    end

    it "doesn not return the order" do
      order_item_food.status = :ready_to_serve
      order_item_drink.status = :ready_to_serve
      expect(Order.with_unfinished_items).to be_empty
    end
  end
end
