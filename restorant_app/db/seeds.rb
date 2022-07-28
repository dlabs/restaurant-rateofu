# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

users = %w[igor stefan jovan]

users.each do |username|
  User.create(username:, role: rand(0..2))
end

10.times do |_i|
  Item.create(
    name: Faker::Food.dish,
    item_type: 0,
    price: Faker::Number.decimal(2)
  )
end

10.times do |_i|
  Item.create(
    name: Faker::Beer.name,
    item_type: 1,
    price: Faker::Number.decimal(2)
  )
end

20.times { |_i| Table.create }
