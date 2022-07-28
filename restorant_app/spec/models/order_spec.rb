require 'rails_helper'

RSpec.describe Order, type: :model do
  describe '#total_price' do
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

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:order)).to be_valid
    end

    it 'is not valid without a table' do
      expect(build(:order, table: nil)).to_not be_valid
    end
  end
end
