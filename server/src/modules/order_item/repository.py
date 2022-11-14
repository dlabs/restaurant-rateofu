import abc
from typing import Generator, Literal, Optional, Protocol

from sqlalchemy.orm.session import Session

from src import logger, models
from src.errors import RecordNotFoundError
from src.models import get_session


class AbstractRepository(Protocol):
    @abc.abstractmethod
    def create(
        self,
        order_id: str,
        menu_item_id: str,
        quantity: int,
        status: Literal["ordered", "preparing", "ready_to_serve", "delivered"],
    ):
        ...

    @abc.abstractmethod
    def update_status(
        self,
        id: str,
        menu_item_id: str,
        new_status: Literal["ordered", "preparing", "ready_to_serve", "delivered"],
    ):
        ...

    @abc.abstractmethod
    def get_all(
        self, has_unfinished_items: bool, offset: int = 0, limit: int = 100
    ) -> list[models.OrderItem]:
        ...


class SqliteRepository(AbstractRepository):
    def __init__(self, session: Session):
        self.session = session

    def create(
        self,
        order_id: str,
        menu_item_id: str,
        quantity: int,
        status: Literal["ordered", "preparing", "ready_to_serve", "delivered"],
    ):
        order_item = models.OrderItem(
            order_id=order_id,
            menu_item_id=menu_item_id,
            quantity=quantity,
            status=status,
        )
        self.session.add(order_item)
        self.session.commit()

        return order_item

    def update_status(
        self,
        id: str,
        menu_item_id: str,
        new_status: Literal["ordered", "preparing", "ready_to_serve", "delivered"],
    ):
        order_item = (
            self.session.query(models.OrderItem)
            .filter_by(id=id, menu_item_id=menu_item_id)
            .first()
        )
        if order_item is None:
            raise RecordNotFoundError(
                f"order_items record with id {id} and menu_item_id {menu_item_id} not found"
            )

        order_item.status = new_status

        self.session.add(order_item)
        self.session.commit()

    def get_all(
        self, has_unfinished_items: bool, offset: int = 0, limit: int = 100
    ) -> list[models.OrderItem]:
        q = self.session.query(models.OrderItem)

        if has_unfinished_items:
            q = q.filter(models.OrderItem.status != "delivered")

        order_items = q.offset(offset).limit(limit).all()

        return order_items


class FakeRepository(AbstractRepository):
    def __init__(self, db: Optional[list[models.OrderItem]] = None):
        self._db = db or []

    def create(
        self,
        order_id: str,
        menu_item_id: str,
        quantity: int,
        status: Literal["ordered", "preparing", "ready_to_serve", "delivered"],
    ):
        id = f"mock-order-item-{len(self._db)+1}"
        order_item = models.OrderItem(
            id=id,
            order_id=order_id,
            menu_item_id=menu_item_id,
            quantity=quantity,
            status=status,
        )
        self._db.append(order_item)

        return order_item

    def update_status(
        self,
        id: str,
        menu_item_id: str,
        new_status: Literal["ordered", "preparing", "ready_to_serve", "delivered"],
    ):
        index = next(
            (
                index
                for (index, order_item) in enumerate(self._db)
                if order_item.id == id and order_item.menu_item_id == menu_item_id
            ),
            None,
        )

        if index is None:
            raise RecordNotFoundError(
                f"order_items record with id {id} and menu_item_id {menu_item_id} not found"
            )

        self._db[index].status = new_status

    def get_all(
        self, has_unfinished_items: bool, offset: int = 0, limit: int = 100
    ) -> list[models.OrderItem]:
        order_items_iter = (order_item for order_item in self._db)

        # Only unfinished items
        if has_unfinished_items:
            order_items_iter = (
                order_item
                for order_item in order_items_iter
                if order_item.status != "delivered"
            )

        order_items = list(order_items_iter)[offset : limit + offset]

        return order_items


def create_default() -> Generator[AbstractRepository, None, None]:
    with get_session() as session:
        default_repo = SqliteRepository(session=session)

        logger.info(f"Create repository: {default_repo.__class__}")
        yield default_repo
