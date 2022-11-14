from http import HTTPStatus
from itertools import groupby
from random import choice, randint, random

from httpx import AsyncClient

from src import models
from src.http import api
from src.modules.auth import service
from src.modules.menu_item import repository as menu_item_repository
from src.modules.order import repository
from src.modules.order_item import repository as order_item_repository
from src.schemas import order_item_schema, order_schema


async def test_get_order_not_found(client: AsyncClient):
    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository()
    api.dependency_overrides[
        order_item_repository.create_default
    ] = lambda: repository.FakeRepository()

    id = 12
    response = await client.get(f"/api/orders/{id}")

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {"detail": f"orders record with id {id} not found"}

    api.dependency_overrides = {}


async def test_create_order(client: AsyncClient):
    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository()
    api.dependency_overrides[
        order_item_repository.create_default
    ] = lambda: order_item_repository.FakeRepository()

    table_id = "mock-table-1"

    ois = [
        order_item_schema.CreateItemModel(
            item_id=f"mock-item-{i}", quantity=randint(1, 10)
        )
        for i in range(6)
    ]
    o = order_schema.CreateOrderModel(table_id=table_id, items=ois)

    response = await client.post("/api/orders", json=o.dict())

    assert response.status_code == HTTPStatus.OK
    assert response.json().keys() == {"order_id", "table_id", "order_items"}
    assert all(
        order_item.keys() == {"order_item_id", "item_id", "status"}
        for order_item in response.json()["order_items"]
    )

    api.dependency_overrides = {}


async def test_get_order(client: AsyncClient):
    id = "mock-order-1"

    _menu_item_db = [
        models.MenuItem(id=f"mock-menu-item-{i}", price=round(random(), 2))
        for i in range(10)
    ]

    _db: list[models.Order] = []
    for i in range(100):
        menu_item = choice(_menu_item_db)
        _db.append(
            models.Order(
                id=id,
                table_id="mock-table-1",
                order_items=[
                    models.OrderItem(
                        id=f"mock-item-{i}",
                        order_id=id,
                        menu_item_id=menu_item.id,
                        menu_item=menu_item,
                        quantity=randint(1, 10),
                        status=choice(
                            ["ordered", "preparing", "ready_to_serve", "delivered"]
                        ),
                    )
                    for i in range(100)
                ],
            )
        )

    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository(db=_db)
    api.dependency_overrides[
        menu_item_repository.create_default
    ] = lambda: menu_item_repository.FakeRepository(db=_menu_item_db)

    response = await client.get(f"/api/orders/{id}")

    order = _db[0]

    total = sum(order_item.menu_item.price for order_item in order.order_items)

    ois = [
        order_item_schema.OutModel(
            order_item_id=order_item.id,
            item_id=order_item.menu_item_id,
            status=order_item.status,
        )
        for order_item in order.order_items
    ]

    o = order_schema.OutWithTotalModel(
        order_id=order.id, table_id=order.table_id, order_items=ois, total=total
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == o

    api.dependency_overrides = {}


async def test_get_orders_only_unfinished(client: AsyncClient):
    _db_orders: list[models.Order] = [
        models.Order(id=f"mock-order-{i}", table_id=f"mock-table-{i}")
        for i in range(30)
    ]

    _db: list[models.OrderItem] = []
    for i in range(1, 100):
        order = choice(_db_orders)

        _db.append(
            models.OrderItem(
                id=f"mock-order-item-{i}",
                order_id=order.id,
                order=order,
                menu_item_id=f"mock-menu-item-{i}",
                quantity=randint(1, 10),
                status=choice(["ordered", "preparing", "ready_to_serve", "delivered"]),
            )
        )

    expected_order_items = [
        order_item for order_item in _db if order_item.status != "delivered"
    ]
    expected: list[order_schema.OutModel] = []
    for order_id, grp in groupby(
        expected_order_items, lambda order_item: order_item.order_id
    ):
        current_order_items = list(grp)

        table_id = current_order_items[0].order.table_id

        ois = [
            order_item_schema.OutModel(
                order_item_id=order_item.id,
                item_id=order_item.menu_item_id,
                status=order_item.status,
            )
            for order_item in current_order_items
        ]
        expected.append(
            order_schema.OutModel(order_id=order_id, table_id=table_id, order_items=ois)
        )

    api.dependency_overrides[
        order_item_repository.create_default
    ] = lambda: order_item_repository.FakeRepository(_db)
    api.dependency_overrides[service.get_username] = lambda: None

    response = await client.get("/api/orders", params={"has_unfinished_items": True})

    assert response.status_code == HTTPStatus.OK
    assert response.json() == expected

    api.dependency_overrides = {}


async def test_get_orders_all(client: AsyncClient):
    _db_orders: list[models.Order] = [
        models.Order(id=f"mock-order-{i}", table_id=f"mock-table-{i}")
        for i in range(30)
    ]

    _db: list[models.OrderItem] = []
    for i in range(1, 100):
        order = choice(_db_orders)

        _db.append(
            models.OrderItem(
                id=f"mock-order-item-{i}",
                order_id=order.id,
                order=order,
                menu_item_id=f"mock-menu-item-{i}",
                quantity=randint(1, 10),
                status=choice(["ordered", "preparing", "ready_to_serve", "delivered"]),
            )
        )

    expected_order_items = [order_item for order_item in _db]
    expected: list[order_schema.OutModel] = []
    for order_id, grp in groupby(
        expected_order_items, lambda order_item: order_item.order_id
    ):
        current_order_items = list(grp)

        table_id = current_order_items[0].order.table_id

        ois = [
            order_item_schema.OutModel(
                order_item_id=order_item.id,
                item_id=order_item.menu_item_id,
                status=order_item.status,
            )
            for order_item in current_order_items
        ]
        expected.append(
            order_schema.OutModel(order_id=order_id, table_id=table_id, order_items=ois)
        )

    api.dependency_overrides[
        order_item_repository.create_default
    ] = lambda: order_item_repository.FakeRepository(_db)
    api.dependency_overrides[service.get_username] = lambda: None

    response = await client.get("/api/orders", params={"has_unfinished_items": False})

    assert response.status_code == HTTPStatus.OK
    assert response.json() == expected

    api.dependency_overrides = {}
