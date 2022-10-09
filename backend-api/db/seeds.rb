# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

menu_items = [{title: "Grilled space-whale steak with algae puree",
               description: nil, type:"Food", price: 66.50, url: "https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png" },
              {title: "Tea substitute", description: nil,
               type:"Drink", price: 1.50, url: "https://miro.medium.com/fit/c/224/224/1*XtiZGHIBMEz1cLHlKNQBmw.jpeg" },
              {title: "Hagro biscuit", description: nil,
               type:"Food", price: 32.00, url: "https://miro.medium.com/fit/c/224/224/1*3AhpDV9YeDiLIIZS5QIqmQ.jpeg" },
              {title: "Ameglian Major Cow casserole", description: nil,
               type:"Food", price: 55.75, url: "https://miro.medium.com/fit/c/224/224/1*EkcYr-aHNM5B_ovLh2y2Vg.jpeg" },
              {title: "Pan Galactic Gargle Blaster", description: nil,
               type:"Drink", price: 5.50, url: "https://miro.medium.com/fit/c/224/224/0*bh7NVKFynObtNa5x" },
              {title: "Janx Spirit", description: nil,
               type:"Drink", price: 7.00, url: "https://miro.medium.com/fit/c/224/224/0*PT3IbIkLX0f-HgUD" },
              {title: "Tzjin-anthony-ks", description: "the Gagrakackan version of the gin and tonic",
               type:"Drink", price: 11.50, url: "https://miro.medium.com/max/1400/1*JzYXoL2njAhhvcrqtwBREw.jpeg" }]


require 'uri'

# url = 'https://meme.eq8.eu/noidea.jpg'
# url = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"


# @downloaded_image = URI.parse("https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png").open
# # avatar.attach(io: downloaded_image, filename: "foo.jpg")

# url = URI.parse("https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png")
# @filename = File.basename(url.path)
# @file = URI.open(url)
# user = User.first
# user.avatar.attach(io: file, filename: filename)

menu_items.each do |item|
  a = MenuItem.new
  a.title = item[:title]
  a.description = item[:description]
  a.type = MenuItemFoodTypes[item[:type]]
  a.price = item[:price]

  # url = "https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png"
  url = item[:url]
  filename = File.basename(URI.parse(url).path)
  file = URI.open(url)
  a.image.attach(io: file, filename: filename, content_type: 'image/jpg')

  a.save
end