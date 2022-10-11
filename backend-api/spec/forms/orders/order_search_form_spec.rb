# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'OrderSearchForm' do
  describe '#submit' do
    let(:table) { create(:table) }
    let(:form) { Forms::Orders::OrderSearchForm.new(order_search_form_params) }

    before do
      create_list(:order, 5, :with_unfinished_order_items, table: table)
      create_list(:order, 3, :with_finished_order_items, table: table)
    end

    context 'when we have has_unfinished_items flag in params' do
      let(:order_search_form_params) { { has_unfinished_items: true } }

      it 'finds orders with unfinished items' do
        form.submit

        result = form.results.count
        expected_result = 5
        expect(result).to eql(expected_result)
      end
    end

    context 'when we dont have has_unfinished_items flag in params' do
      let(:order_search_form_params) { {} }

      it 'returns all orders' do
        form.submit

        result = form.results.count
        expected_result = 8
        expect(result).to eql(expected_result)
      end
    end
  end
end
