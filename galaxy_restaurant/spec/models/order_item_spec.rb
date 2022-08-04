require "rails_helper"

RSpec.describe OrderItem do
  let(:order) { build(:order) }
  let(:item) { build(:item) }
  let!(:order_item) { build(:order_item, order: order, item: item) }

  it "must belong to an order" do
    order_item.order = nil
    expect(order_item).not_to be_valid
  end

  it "must belong to an item" do
    order_item.item = nil
    expect(order_item).not_to be_valid
  end

  context "#quantity" do
    it "must be present" do
      order_item.quantity = nil
      expect(order_item).not_to be_valid
    end
  end

  context "#status" do
    it "must be present" do
      order_item.status = nil
      expect(order_item).not_to be_valid
    end
  end

  context "#total_price" do
    it "should return the correct price" do
      expect(order_item.price.to_f).to eq 1299.9
    end
  end
end
