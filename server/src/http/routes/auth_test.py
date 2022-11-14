from http import HTTPStatus
from random import choice

from httpx import AsyncClient

from src import models
from src.http import api
from src.modules.user import repository


async def test_login_username_role_mismatch(client: AsyncClient):
    _db = [
        models.User(username=username, role=role)
        for (username, role) in (
            ("alice", "chef"),
            ("bob", "barman"),
            ("root", "waiter"),
            ("tod", "waiter"),
        )
    ]

    user = choice(_db)
    username = user.username
    mismatch_role = "chef" if user.role != "chef" else "barman"

    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository(db=_db)

    data = {"username": username, "role": mismatch_role}
    response = await client.post("/api/login", json=data)

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {
        "detail": f"users record with username {username} and role {mismatch_role} not found"
    }

    api.dependency_overrides = {}


async def test_login(client: AsyncClient):
    _db = [
        models.User(username=username, role=role)
        for (username, role) in (
            ("alice", "chef"),
            ("bob", "barman"),
            ("root", "waiter"),
            ("tod", "waiter"),
        )
    ]

    user = choice(_db)

    api.dependency_overrides[
        repository.create_default
    ] = lambda: repository.FakeRepository(db=_db)

    data = {"username": user.username, "role": user.role}
    response = await client.post("/api/login", json=data)

    assert response.status_code == HTTPStatus.OK
    assert response.json().keys() == {"bearer_token"}

    api.dependency_overrides = {}
