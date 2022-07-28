FactoryBot.define do
  factory :order do
    table
    after(:create) do |order|
      item = create(:item)
      create_list(:order_item, 2, order: order, item: item)
    end
  end
end
