require 'rails_helper'

RSpec.describe Item, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:item)).to be_valid
    end

    it 'is not valid without a name' do
      expect(build(:item, name: nil)).to_not be_valid
    end

    it 'is not valid without a price' do
      expect(build(:item, price: nil)).to_not be_valid
    end

    it 'is not valid without a item_type' do
      expect(build(:item, item_type: nil)).to_not be_valid
    end
  end
end
