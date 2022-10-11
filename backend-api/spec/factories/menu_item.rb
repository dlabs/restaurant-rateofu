# frozen_string_literal: true

FactoryBot.define do
  factory :menu_item do
    sequence(:title) { |n| "menu item #{n}" }
    type { 1 }
    description { '12345' }
    price_cents { 100 }
  end
end
