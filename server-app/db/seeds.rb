puts "Generating Food Menu Items..."
3.times do
  Item.create(title: Faker::Food.dish, description: Faker::Food.description, item_type: "food", price_cents: rand(700..2_500))
end

puts "Generating Drink Menu Items..."
2.times do
  Item.create(title: "#{Faker::Tea.variety} drink", description: Faker::Food.description, item_type: "drink", price_cents: rand(200..1_000))
end

puts "Done! 🎉"
