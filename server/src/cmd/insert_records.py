from src.models import MenuItem, Table, User, get_session

menu_items = [
    {
        "title": "Grilled space-whale steak with algae puree",
        "price": 66.5,
        "description": "some description",
        "type": "food",
        "image": "https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png",
    },
    {
        "title": "Tea substitute",
        "price": 1.5,
        "description": "some description",
        "type": "drink",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Milk_clouds_in_tea.jpeg/1920px-Milk_clouds_in_tea.jpeg",
    },
    {
        "title": "Hagro biscuit",
        "price": 32.0,
        "description": "some description",
        "type": "food",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Biscuits_in_Ghana.jpg",
    },
    {
        "title": "Ameglian Major Cow casserole",
        "price": 55.75,
        "description": "some description",
        "type": "food",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Makaronilaatikko.jpg",
    },
    {
        "title": "Pan Galactic Gargle Blaster",
        "price": 5.5,
        "description": "some description",
        "type": "drink",
        "image": "https://i.imgur.com/lSI0w5B.jpg",
    },
    {
        "title": "Janx Spirit",
        "price": 7.0,
        "description": "some description",
        "type": "drink",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Flaming_cocktails.jpg",
    },
    {
        "title": "Tzjin-anthony-ks",
        "price": 11.5,
        "description": "The Gagrakackan version of the gin and tonic",
        "type": "drink",
        "image": "https://i0.wp.com/ficticiouslydelicious.com/wp-content/uploads/2019/08/jt4.jpeg?resize=727%2C1024",
    },
]

users = [
    {"username": "alice", "role": "chef"},
    {"username": "bob", "role": "barman"},
    {"username": "jack", "role": "waiter"},
    {"username": "root", "role": "waiter"},
]

if __name__ == "__main__":
    with get_session() as session:
        session.add_all([MenuItem(**menu_item) for menu_item in menu_items])
        session.add_all([User(**user) for user in users])
        session.add_all([Table() for _ in range(5)])

        session.commit()
