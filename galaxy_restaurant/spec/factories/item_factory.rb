FactoryBot.define do
  factory :item, class: Item do
    title { "Whale Steak" }
    description { "Various ingredients." }
    price { 129.99 }
    kind { :food }
  end
end
