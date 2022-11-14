import abc
from typing import Generator, Optional, Protocol

from sqlalchemy.orm.session import Session

from src import logger, models
from src.models import get_session


class AbstractRepository(Protocol):
    @abc.abstractmethod
    def create(self, table_id: str) -> models.Order:
        ...

    @abc.abstractmethod
    def get_by_id(self, id: str) -> models.Order | None:
        ...


class SqliteRepository(AbstractRepository):
    def __init__(self, session: Session):
        self.session = session

    def create(self, table_id) -> models.Order:
        order = models.Order(table_id=table_id)

        self.session.add(order)
        self.session.commit()

        return order

    def get_by_id(self, id: str) -> models.Order | None:
        order = self.session.query(models.Order).filter_by(id=id).first()

        return order


class FakeRepository(AbstractRepository):
    def __init__(self, db: Optional[list[models.Order]] = None):
        self._db = db or []

    def create(self, table_id: str) -> models.Order:
        id = f"mock-order-{len(self._db)+1}"
        order = models.Order(id=id, table_id=table_id)
        self._db.append(order)

        return order

    def get_by_id(self, id: str) -> models.Order | None:
        order = next((order for order in self._db if order.id == id), None)

        return order


def create_default() -> Generator[AbstractRepository, None, None]:
    with get_session() as session:
        default_repo = SqliteRepository(session=session)

        logger.info(f"Create repository: {default_repo.__class__}")
        yield default_repo
