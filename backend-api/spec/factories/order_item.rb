# frozen_string_literal: true

FactoryBot.define do
  factory :order_item do
    status { 1 }
  end
end

# create_table "order_items", force: :cascade do |t|
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.integer "order_id"
#   t.integer "menu_item_id"
#   t.integer "status"
# end
