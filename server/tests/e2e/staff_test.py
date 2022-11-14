from http import HTTPStatus
from itertools import groupby

from httpx import AsyncClient
from sqlalchemy.orm import Session

from src import models
from src.modules.jwt import service as jwt_service
from src.schemas import order_item_schema, order_schema


async def test_login_username_role_mismatch(client: AsyncClient, session: Session):
    user = session.query(models.User).first()
    username = user.username
    mismatch_role = "chef" if user.role != "chef" else "barman"

    data = {"username": username, "role": mismatch_role}
    response = await client.post("/api/login", json=data)

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {
        "detail": f"users record with username {username} and role {mismatch_role} not found"
    }


async def test_login(client: AsyncClient, session: Session):
    user = session.query(models.User).first()

    data = {"username": user.username, "role": user.role}
    response = await client.post("/api/login", json=data)

    assert response.status_code == HTTPStatus.OK
    assert response.json().keys() == {"bearer_token"}


async def test_update_status_record_not_found(client: AsyncClient):
    token = jwt_service.encode({"username": "bob"})
    headers = {"authorization": f"bearer {token}"}

    response = await client.put(
        "/api/order-items/invalid-id/invalid-menu-item-id",
        headers=headers,
        json={"status": "delivered"},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND


async def test_update_status(client: AsyncClient, session: Session):
    token = jwt_service.encode({"username": "bob"})
    headers = {"authorization": f"bearer {token}"}

    order_item = session.query(models.OrderItem).first()
    new_status = "preparing" if order_item.status != "preparing" else "ready_to_serve"

    assert order_item.status != new_status

    response = await client.put(
        f"/api/order-items/{order_item.id}/{order_item.menu_item_id}",
        headers=headers,
        json={"status": new_status},
    )

    session.refresh(order_item)

    assert response.status_code == HTTPStatus.NO_CONTENT
    assert order_item.status == new_status


async def test_get_orders_only_unfinished(client: AsyncClient, session: Session):
    token = jwt_service.encode({"username": "bob"})
    headers = {"authorization": f"bearer {token}"}

    order_items = (
        session.query(models.OrderItem)
        .filter(models.OrderItem.status != "delivered")
        .limit(100)
        .all()
    )
    orders: list[models.Order] = []

    for order_id, grp in groupby(order_items, lambda order_item: order_item.order_id):
        current_order_items = list(grp)

        table_id = current_order_items[0].order.table_id

        orders.append(
            models.Order(
                id=order_id,
                table_id=table_id,
                order_items=current_order_items,
            )
        )

    expected: list[order_schema.OutModel] = [
        order_schema.OutModel(
            order_id=order.id,
            table_id=order.table_id,
            order_items=[
                order_item_schema.OutModel(
                    order_item_id=order_item.id,
                    item_id=order_item.menu_item_id,
                    status=order_item.status,
                )
                for order_item in order.order_items
            ],
        )
        for order in orders
    ]

    response = await client.get(
        "/api/orders", params={"has_unfinished_items": True}, headers=headers
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == expected


async def test_get_orders_all(client: AsyncClient, session: Session):
    token = jwt_service.encode({"username": "bob"})
    headers = {"authorization": f"bearer {token}"}

    order_items = session.query(models.OrderItem).limit(100).all()
    orders: list[models.Order] = []

    for order_id, grp in groupby(order_items, lambda order_item: order_item.order_id):
        current_order_items = list(grp)

        table_id = current_order_items[0].order.table_id

        orders.append(
            models.Order(
                id=order_id,
                table_id=table_id,
                order_items=current_order_items,
            )
        )

    expected: list[order_schema.OutModel] = [
        order_schema.OutModel(
            order_id=order.id,
            table_id=order.table_id,
            order_items=[
                order_item_schema.OutModel(
                    order_item_id=order_item.id,
                    item_id=order_item.menu_item_id,
                    status=order_item.status,
                )
                for order_item in order.order_items
            ],
        )
        for order in orders
    ]

    response = await client.get(
        "/api/orders", params={"has_unfinished_items": False}, headers=headers
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == expected
