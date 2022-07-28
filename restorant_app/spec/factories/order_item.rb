FactoryBot.define do
  factory :order_item do
    association :order, factory: :order
    association :item, factory: :item
    quantity { rand(1..10) }
    status { 'ordered' }
  end
end
