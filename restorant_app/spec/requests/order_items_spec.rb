require 'rails_helper'

RSpec.describe Api::V1::Staff::OrderItemsController, type: :request do
  describe 'GET #show' do
    # before { create(:order_item) }
    # it 'returns an order item' do
    #   get "/api/v1/staff/order_items/1", xhr: true
    #   expect(response).to have_http_status(200)
    # end
  end

  describe 'PUT #update' do
    context 'when user is authorized' do
      before do
        user = create(:user)
        post api_login_path(params: { username: user.username, role: user.role })
        @token = JSON.parse(response.body)['token']
      end
      it 'updates an order item' do
        order_item = create(:order_item)

        put api_v1_staff_order_item_update_path(order_item.id),
            params: { order_item: { status: :ready_to_serve } },
            headers: { Authorization: @token },
            xhr: true
        expect(response).to have_http_status(200)
        expect(order_item.reload.status).to eq('ready_to_serve')
      end
    end
    context 'when user is not authorized' do
      it 'returns an error' do
        order_item = create(:order_item)

        put api_v1_staff_order_item_update_path(order_item.id),
            params: { order_item: { status: :ready_to_serve } },
            xhr: true
        expect(response).to have_http_status(401)
      end
    end
  end
end
