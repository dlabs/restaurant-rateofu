from typing import Literal

from pydantic import BaseModel, PositiveInt


class CreateItemModel(BaseModel):
    item_id: str
    quantity: PositiveInt


class OutModel(BaseModel):
    order_item_id: str
    item_id: str
    status: Literal["ordered", "preparing", "ready_to_serve", "delivered"]


class UpdateStatusModel(BaseModel):
    status: Literal["ordered", "preparing", "ready_to_serve", "delivered"]
