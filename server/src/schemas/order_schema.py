from pydantic import BaseModel, PositiveInt

from src.schemas import order_item_schema


class CreateOrderModel(BaseModel):
    table_id: str
    items: list[order_item_schema.CreateItemModel]


class OutModel(BaseModel):
    order_id: str
    table_id: str
    order_items: list[order_item_schema.OutModel]


class OutWithTotalModel(BaseModel):
    order_id: str
    table_id: str
    order_items: list[order_item_schema.OutModel]
    total: float
