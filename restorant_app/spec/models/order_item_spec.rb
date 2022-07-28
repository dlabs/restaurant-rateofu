require 'rails_helper'

RSpec.describe OrderItem, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:order_item)).to be_valid
    end

    it 'is not valid without an order' do
      expect(build(:order_item, order: nil)).to_not be_valid
    end

    it 'is not valid without an item' do
      expect(build(:order_item, item: nil)).to_not be_valid
    end

    it 'is not valid without a quantity' do
      expect(build(:order_item, quantity: nil)).to_not be_valid
    end
  end

  describe 'total price' do
    it 'returns the sum of all order_items' do
      item1 = create(:item, price: 10)
      item2 = create(:item, price: 20)
      order = create(:order, order_items:
        [
          create(:order_item, item: item1, quantity: 1),
          create(:order_item, item: item2, quantity: 1)
        ])
      expect(order.total_price).to eq(30)
    end
  end
end
