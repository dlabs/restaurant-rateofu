# frozen_string_literal: true

FactoryBot.define do
  factory :order do
    table_id { 1 }
    total_cents { 100 }

    trait :with_unfinished_order_items do
      after(:create) do |order|
        menu_item = create(:menu_item)
        create_list(:order_item, 5, order: order, status: 1, menu_item: menu_item)
      end
    end

    trait :with_finished_order_items do
      after(:create) do |order|
        menu_item = create(:menu_item)
        create_list(:order_item, 5, order: order, status: 4, menu_item: menu_item)
      end
    end
  end
end

#
# create_table "orders", force: :cascade do |t|
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.integer "table_id"
#   t.integer "total_cents", default: 0, null: false
# end
