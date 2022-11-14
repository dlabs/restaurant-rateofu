from datetime import timedelta

import pytest
from jose import JWTError, jwt

from src import settings
from src.modules.datetime import service as datetime_service

from . import service


def test_encode_no_explicit_exp():
    payload = {"username": "mock-user-1"}

    token = service.encode(payload)
    result = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])

    assert isinstance(token, str)
    assert jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    assert result.keys() == {"username", "iat", "exp"}
    assert result["username"] == payload["username"]


def test_encode():
    now = datetime_service.now()
    exp = now + timedelta(minutes=15)
    payload = {
        "username": "mock-user-1",
        "iat": now.timestamp(),
        "exp": exp.timestamp(),
    }

    token = service.encode(payload)
    result = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])

    assert isinstance(token, str)
    assert jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    assert result.keys() == {"username", "iat", "exp"}
    assert result["username"] == payload["username"]


def test_decode_expired():
    now = datetime_service.now()
    exp = now - timedelta(minutes=15)

    payload = {
        "username": "mock-user-1",
        "iat": now.timestamp(),
        "exp": exp.timestamp(),
    }
    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

    with pytest.raises(JWTError):
        _ = service.decode(token)


def test_decode():
    payload = {"username": "mock-user-1"}
    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

    result = service.decode(token)

    assert result["username"] == payload["username"]
