# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
MenuItem.delete_all
Order.delete_all
OrderItem.delete_all

image1 = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
menuitems = MenuItem.create([{ item_title: 'Item title #1',
                               item_image: image1,
                               item_type: 'food',
                               item_price: 10.89 },
                             { item_title: 'Item title #2',
                               item_image: image1,
                               item_type: 'drink',
                               item_price: 8.67 },
                             { item_title: 'Item title #3',
                               item_image: image1,
                               item_type: 'food',
                               item_price: 0.42 }])
