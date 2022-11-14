from fastapi import APIRouter, Depends
from pydantic import PositiveInt

from src.modules.menu_item import repository
from src.schemas import menu_item_schema

r = APIRouter(prefix="/menu-items")


@r.get("/", response_model=list[menu_item_schema.OutModel])
def get_menu_items(
    offset: PositiveInt = 0,
    limit: PositiveInt = 100,
    repo: repository.AbstractRepository = Depends(repository.create_default),
):
    menu_items = repo.get_all(offset, limit)

    return [
        menu_item_schema.OutModel(
            item_id=item.id,
            item_title=item.title,
            item_price=item.price,
            item_description=item.description,
            item_type=item.type,
            item_image=item.image,
        )
        for item in menu_items
    ]
