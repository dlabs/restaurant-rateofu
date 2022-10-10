
## MenuItems
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

## Table
a = Table.new
a.save
