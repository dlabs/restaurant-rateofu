from typing import Literal

from pydantic import BaseModel, constr


class LoginModel(BaseModel):
    username: constr(min_length=3, max_length=40)
    role: Literal["chef", "barman", "waiter"]


class OutModel(BaseModel):
    bearer_token: str
