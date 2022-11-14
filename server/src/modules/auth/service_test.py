from datetime import timedelta
from http import HTTPStatus

import pytest
from fastapi.exceptions import HTTPException

from src.modules.auth import service
from src.modules.datetime import service as datetime_service
from src.modules.jwt import service as jwt_service


def test_get_token_missing_header():
    with pytest.raises(HTTPException) as err:
        service.get_token(None)

    assert err.value.status_code == HTTPStatus.UNAUTHORIZED
    assert err.value.detail == "missing Authorization header"


def test_get_token_invalid_header():
    with pytest.raises(HTTPException) as err:
        service.get_token("some-invalid-header")

    assert err.value.status_code == HTTPStatus.UNAUTHORIZED
    assert err.value.detail == "invalid Authorization header"


def test_get_token_invalid_header():
    expected = "mock-token"
    token = service.get_token(f"Bearer {expected}")

    assert token == expected


def test_get_token_invalid_header():
    expected = "mock-token"
    token = service.get_token(f"Bearer {expected}")

    assert token == expected


def test_get_username_invalid_jwt_token():
    with pytest.raises(HTTPException) as err:
        service.get_username("invalid-jwt-token")

    assert err.value.status_code == HTTPStatus.UNAUTHORIZED


def test_get_username_expired_token():
    now = datetime_service.now()
    exp = now - timedelta(minutes=20)

    token = jwt_service.encode({"username": "mock-user", "exp": exp.timestamp()})

    with pytest.raises(HTTPException) as err:
        service.get_username(token)

    assert err.value.status_code == HTTPStatus.UNAUTHORIZED


def test_get_username_missing_username():
    token = jwt_service.encode({"username": ""})

    with pytest.raises(HTTPException) as err:
        service.get_username(token)

    assert err.value.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert err.value.detail == "missing 'username' claim from token"


def test_get_username():
    expected = "bob"
    token = jwt_service.encode({"username": expected})

    username = service.get_username(token)

    assert username == expected
