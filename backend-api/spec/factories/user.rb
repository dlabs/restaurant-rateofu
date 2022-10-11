# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    username { 'user_one' }
    role { 1 }
  end
end

# create_table "users", force: :cascade do |t|
#   t.string "username"
#   t.integer "role"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end
