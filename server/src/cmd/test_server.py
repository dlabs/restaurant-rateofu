from random import choice, randint, random

import uvicorn

from src import settings
from src.models import *
from src.models._meta import Base, engine


def insert_data():
    with get_session() as session:
        menu_items = [
            MenuItem(
                title=f"mock-menu-item-{i}",
                price=round(random(), 2),
                description="mock-description",
                type=choice(["food", "drink"]),
                image="mock-image",
            )
            for i in range(10)
        ]
        session.add_all(menu_items)
        session.flush(menu_items)

        tables = [Table() for _ in range(10)]
        session.add_all(tables)
        session.flush(tables)

        orders = [Order(table=choice(tables)) for _ in range(10)]
        session.add_all(orders)
        session.flush(orders)

        order_items = [
            OrderItem(
                order=choice(orders),
                menu_item=choice(menu_items),
                quantity=randint(1, 10),
                status=choice(["ordered", "preparing", "ready_to_serve", "delivered"]),
            )
            for _ in range(100)
        ]
        session.add_all(order_items)
        session.flush(order_items)

        users = [
            User(username=username, role=role)
            for (username, role) in (
                ("alice", "chef"),
                ("bob", "barman"),
                ("root", "waiter"),
                ("tod", "waiter"),
            )
        ]
        session.add_all(users)
        session.flush(users)

        session.commit()


if __name__ == "__main__":
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    insert_data()

    uvicorn.run("src.http:app", port=settings.server_test_port, reload=True, workers=1)
