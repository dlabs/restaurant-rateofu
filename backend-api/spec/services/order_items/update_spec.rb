# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Update' do
  describe '#call' do
    let(:table) { create(:table) }
    let(:order) { create(:order, table: table) }
    let(:menu_item) { create(:menu_item) }

    let(:order_item) { create(:order_item, status: 1, order: order, menu_item: menu_item) }

    before do
      service = Services::OrderItems::Update.new(order_item, order_item_params)
      service.call
    end

    context 'when have correct params' do
      let(:order_item_params) { { status: :ready_to_serve } }

      it 'updates status of order item' do
        order_item = OrderItem.first
        result = order_item.status(:symbol)
        expected_result = :ready_to_serve
        expect(result).to eql(expected_result)
      end
    end

    context 'when have incorrect params' do
      let(:order_item_params) { {} }

      it 'does not update status of order item' do
        order_item = OrderItem.first
        result = order_item.status(:symbol)
        expected_result = :ordered
        expect(result).to eql(expected_result)
      end
    end
  end
end
