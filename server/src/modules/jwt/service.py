from datetime import timedelta
from typing import Any

from jose import jwt

from src import settings
from src.modules.datetime import service

Payload = dict[str, Any]


def encode(payload: Payload) -> str:
    now = service.now()
    exp = now + timedelta(minutes=settings.jwt_expired_after_minutes)

    payload.setdefault("iat", now.timestamp())
    payload.setdefault("exp", exp.timestamp())

    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

    return token


def decode(token: str) -> Payload:
    payload = jwt.decode(
        token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
    )
    return payload
