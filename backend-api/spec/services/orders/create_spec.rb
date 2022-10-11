# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create' do
  describe '#call' do
    let(:table) { create(:table) }
    let(:menu_item_one) { create(:menu_item) }
    let(:menu_item_two) { create(:menu_item) }

    before do
      service = Services::Orders::Create.new(table, order_params)
      service.call
    end

    context 'when have correct params' do
      let(:order_params) { [{ item_id: menu_item_one.id, quantity: 2 }, { item_id: menu_item_two.id, quantity: 3 }] }

      it 'creates order items' do
        order_items = OrderItem.all
        expected_result = 5
        expect(order_items.count).to eql(expected_result)
      end

      it 'creates order' do
        order = Order.all
        expected_result = 1
        expect(order.count).to eql(expected_result)
      end

      it 'calculates correct total for order' do
        order = Order.first
        expected_result = '5.00'
        expect(order.total.to_s).to eql(expected_result)
      end
    end

    context 'when have incorrect params' do
      let(:order_params) { [] }

      it 'does not create any order items' do
        order_items = OrderItem.all
        expected_result = 0
        expect(order_items.count).to eql(expected_result)
      end

      it 'does not create order ' do
        order = Order.all
        expected_result = 0
        expect(order.count).to eql(expected_result)
      end
    end
  end
end
