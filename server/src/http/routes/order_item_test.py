from http import HTTPStatus
from random import choice, randint

from httpx import AsyncClient

from src import models
from src.http import api
from src.modules.auth import service
from src.modules.order_item import repository


async def test_update_status(client: AsyncClient):
    _db = [
        models.OrderItem(
            id=f"mock-order-item-{i}",
            menu_item_id=f"mock-menu-item-{i}",
            status=choice(["ordered", "preparing", "ready_to_serve", "delivered"]),
        )
        for i in range(20)
    ]

    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository(_db)
    api.dependency_overrides[service.get_username] = lambda: None

    index = randint(0, len(_db) - 1)
    new_status = "preparing" if _db[index].status != "preparing" else "delivered"
    data = {"status": new_status}

    assert _db[index].status != new_status
    response = await client.put(
        f"/api/order-items/{_db[index].id}/{_db[index].menu_item_id}", json=data
    )

    assert response.status_code == HTTPStatus.NO_CONTENT
    assert _db[index].status == new_status

    api.dependency_overrides = {}


async def test_update_status_record_not_found(client: AsyncClient):
    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository()
    api.dependency_overrides[service.get_username] = lambda: None

    id = "invalid-id"
    menu_item_id = "invalid-menu-item-id"
    data = {"status": "delivered"}
    response = await client.put(f"/api/order-items/{id}/{menu_item_id}", json=data)

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {
        "detail": f"order_items record with id {id} and menu_item_id {menu_item_id} not found"
    }

    api.dependency_overrides = {}
