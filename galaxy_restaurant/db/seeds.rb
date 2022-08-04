Table.find_or_create_by(
  id: "a589d607-2843-4a35-9e49-753cabef71df"
)

StaffMember.find_or_create_by(
  username: "John Chef",
  role: :chef
)

StaffMember.find_or_create_by(
  username: "John Barman",
  role: :barman
)

StaffMember.find_or_create_by(
  username: "John Waiter",
  role: :waiter
)

Item.find_or_create_by(
  title: "Grilled space-whale steak with algae puree",
  price: 66.50,
  description: "Delicious",
  kind: :food,
  image: "https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png"
)

Item.find_or_create_by(
  title: "Tea substitute",
  price: 1.50,
  description: "Delicious",
  kind: :drink,
  image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hdwallpaper.nu%2Fwp-content%2Fuploads%2F2015%2F08%2Fcocktail_wallpaper_084.jpg&f=1&nofb=1"
)

Item.find_or_create_by(
  title: "Hagro biscuit",
  price: 32.75,
  description: "Delicious",
  kind: :food,
  image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0pC8xbZOl40%2Fmaxresdefault.jpg&f=1&nofb=1"
)

Item.find_or_create_by(
  title: "Ameglian Major Cow casserole",
  price: 55.75,
  description: "Delicious",
  kind: :food,
  image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F10%2FBeef-Steak-Wallpaper-.jpg&f=1&nofb=1"
)

Item.find_or_create_by(
  title: "Pan Galactic Gargle Blaster",
  price: 5.50,
  description: "Delicious",
  kind: :drink,
  image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs-i.huffpost.com%2Fgen%2F1756043%2Fimages%2Fo-COCKTAIL-facebook.jpg&f=1&nofb=1"
)

Item.find_or_create_by(
  title: "Tzjin-anthony-ks",
  price: 11.50,
  description: "the Gagrakackan version of the gin and tonic.",
  kind: :drink,
  image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fblog.ciachef.edu%2Fwp-content%2Fuploads%2F2016%2F12%2FCranberry-Smash-2.jpg&f=1&nofb=1"
)
