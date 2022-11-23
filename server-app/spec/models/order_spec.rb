require 'rails_helper'

RSpec.describe Order, type: :model do
  describe 'associations' do
    it { should have_many(:order_items) }
  end

  it "generates uuid" do
    order = build(:order)
    expect(order.id).to be_nil
    order.save
    uuid_length = 36
    expect(order.id.length).to eq(uuid_length)
  end

end
