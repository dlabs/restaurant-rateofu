FactoryBot.define do
  factory :item do
    sequence(:title) { |n| "title_#{n}" }
    description { "this is a long description" }
    item_type { %w(food drink).sample }
    price_cents { 1000 }
  end
end
