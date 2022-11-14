from http import HTTPStatus

from fastapi import Depends, Header, HTTPException
from jose import JWTError

from src import logger
from src.modules.jwt import service


def get_token(authorization: str | None = Header(default=None)) -> str:
    if authorization is None:
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED, detail="missing Authorization header"
        )

    token = authorization.partition(" ")[2]
    if token == "":
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED, detail="invalid Authorization header"
        )

    return token


def get_username(token: str = Depends(get_token)):
    try:
        payload = service.decode(token)
    except JWTError as err:
        logger.warning(str(err))
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail=str(err))

    username = payload.get("username")
    if username == "":
        logger.error(f"'username' claim missing from token's payload: {payload}")
        raise HTTPException(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            detail="missing 'username' claim from token",
        )

    return username
