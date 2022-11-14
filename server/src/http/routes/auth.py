from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException

from src.modules.jwt import service
from src.modules.user import repository
from src.schemas import auth_schema

r = APIRouter()


@r.post("/login", response_model=auth_schema.OutModel)
def login(
    a: auth_schema.LoginModel,
    repo: repository.AbstractRepository = Depends(repository.create_default),
):

    user = repo.get_by_username_and_role(a.username, a.role)
    if user is None:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail=f"users record with username {a.username} and role {a.role} not found",
        )

    payload = {"username": user.username}
    token = service.encode(payload)

    return auth_schema.OutModel(bearer_token=token)
