from http import HTTPStatus
from random import randint

from httpx import AsyncClient
from sqlalchemy.orm import Session

from src import models
from src.models import get_session
from src.schemas import menu_item_schema


async def test_get_menu_items(client: AsyncClient, session: Session):
    response = await client.get("/api/menu-items")

    assert response.status_code == HTTPStatus.OK

    menu_items = session.query(models.MenuItem).all()
    assert len(menu_items) > 0

    mis = [
        menu_item_schema.OutModel(
            item_id=item.id,
            item_title=item.title,
            item_price=item.price,
            item_description=item.description,
            item_type=item.type,
            item_image=item.image,
        )
        for item in menu_items
    ]

    assert response.json() == mis


async def test_create_order(client: AsyncClient, session: Session):
    prev_orders_size = len(session.query(models.Order).all())

    table = session.query(models.Table).first()
    menu_items = [
        {"item_id": menu_item.id, "quantity": randint(1, 10)}
        for menu_item in session.query(models.MenuItem).limit(randint(2, 6))
    ]

    data = {"table_id": table.id, "items": menu_items}
    response = await client.post("/api/orders", json=data)

    assert response.status_code == HTTPStatus.OK

    order_id = response.json()["order_id"]
    order = session.query(models.Order).filter_by(id=order_id).first()

    current_orders_size = len(session.query(models.Order).all())

    assert current_orders_size == prev_orders_size + 1
    assert order.table_id == response.json()["table_id"]
    assert len(order.order_items) > 0
    assert len(order.order_items) == len(response.json()["order_items"])


async def test_get_order(client: AsyncClient, session: Session):
    order = session.query(models.Order).first()
    response = await client.get(f"/api/orders/{order.id}")

    total = sum(order_item.menu_item.price for order_item in order.order_items)

    assert response.status_code == HTTPStatus.OK
    assert response.json()["total"] == total
