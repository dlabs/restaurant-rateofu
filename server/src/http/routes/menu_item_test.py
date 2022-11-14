from http import HTTPStatus
from random import random

from httpx import AsyncClient

from src import models
from src.http import api
from src.modules.menu_item import repository
from src.schemas import menu_item_schema


async def test_get_menu_items(client: AsyncClient):
    _db = [
        models.MenuItem(
            id=f"mock-id-{i}",
            title=f"mock-title-{i}",
            price=round(random(), 2),
            description=f"mock-description-{i}",
            type="food",
            image=f"mock-image-{i}",
        )
        for i in range(10)
    ]

    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository(db=_db)

    response = await client.get("/api/menu-items")

    assert response.status_code == HTTPStatus.OK
    assert len(response.json()) > 0
    assert response.json() == [
        menu_item_schema.OutModel(
            item_id=record.id,
            item_title=record.title,
            item_price=record.price,
            item_description=record.description,
            item_type=record.type,
            item_image=record.image,
        )
        for record in _db
    ]

    api.dependency_overrides = {}
