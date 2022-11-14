from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException

from src import logger
from src.errors import RecordNotFoundError
from src.modules.auth import service as auth_service
from src.modules.order_item import repository
from src.schemas import order_item_schema

r = APIRouter(prefix="/order-items")


@r.put(
    "/{id}/{menu_item_id}",
    dependencies=[Depends(auth_service.get_username)],
    status_code=HTTPStatus.NO_CONTENT,
)
def update_status(
    id: str,
    menu_item_id: str,
    o: order_item_schema.UpdateStatusModel,
    repo: repository.AbstractRepository = Depends(repository.create_default),
):
    try:
        repo.update_status(id, menu_item_id, o.status)
    except RecordNotFoundError as err:
        logger.warning(str(err))
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail=str(err))
