from typing import Literal

from pydantic import BaseModel


class OutModel(BaseModel):
    item_id: str
    item_title: str
    item_price: float
    item_description: str
    item_type: Literal["food", "drink"]
    item_image: str
