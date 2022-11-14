from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException

from src.modules.auth import service as auth_service
from src.modules.order import repository, service
from src.modules.order_item import repository as order_item_repository
from src.schemas import order_item_schema, order_schema

r = APIRouter(prefix="/orders")


@r.post("/", response_model=order_schema.OutModel)
def create_order(
    o: order_schema.CreateOrderModel,
    repo: repository.AbstractRepository = Depends(repository.create_default),
    order_item_repo: order_item_repository.AbstractRepository = Depends(
        order_item_repository.create_default
    ),
):
    order = repo.create(table_id=o.table_id)
    order_items = [
        order_item_repo.create(
            order_id=order.id,
            menu_item_id=item.item_id,
            quantity=item.quantity,
            status="ordered",
        )
        for item in o.items
    ]

    ois = [
        order_item_schema.OutModel(
            order_item_id=order_item.id,
            item_id=order_item.menu_item_id,
            status=order_item.status,
        )
        for order_item in order_items
    ]
    o = order_schema.OutModel(
        order_id=order.id, table_id=order.table_id, order_items=ois
    )

    return o


@r.get("/{id}", response_model=order_schema.OutWithTotalModel)
def get_order(
    id: str,
    repo: repository.AbstractRepository = Depends(repository.create_default),
):
    order = repo.get_by_id(id)
    if order is None:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail=f"orders record with id {id} not found",
        )

    ois = [
        order_item_schema.OutModel(
            order_item_id=order_item.id,
            item_id=order_item.menu_item_id,
            status=order_item.status,
        )
        for order_item in order.order_items
    ]

    total = sum(order_item.menu_item.price for order_item in order.order_items)

    o = order_schema.OutWithTotalModel(
        order_id=order.id,
        table_id=order.table_id,
        order_items=ois,
        total=total,
    )

    return o


@r.get(
    "/",
    dependencies=[Depends(auth_service.get_username)],
    response_model=list[order_schema.OutModel],
)
def get_orders(
    has_unfinished_items: bool,
    order_item_repo: order_item_repository.AbstractRepository = Depends(
        order_item_repository.create_default
    ),
):
    order_items = order_item_repo.get_all(has_unfinished_items)
    orders = service.group_orders(order_items)

    os: list[order_schema.OutModel] = [
        order_schema.OutModel(
            order_id=order.id,
            table_id=order.table_id,
            order_items=[
                order_item_schema.OutModel(
                    order_item_id=order_item.id,
                    item_id=order_item.menu_item_id,
                    status=order_item.status,
                )
                for order_item in order.order_items
            ],
        )
        for order in orders
    ]

    return os
