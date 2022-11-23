FactoryBot.define do
  factory :order_item do
    order
    sequence(:id) { |n| "my-uuid-#{n}" }
    quantity { 1 }
    status { OrderItem::Status::Ordered }
  end
end
