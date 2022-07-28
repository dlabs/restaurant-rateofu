FactoryBot.define do
  factory :item do
    name { Faker::Commerce.product_name }
    item_type { %w[food drink].sample }
    price { rand(5..200) }
    # image_url { Faker::LoremPixel.image }
  end
end