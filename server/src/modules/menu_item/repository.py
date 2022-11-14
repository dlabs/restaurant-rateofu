import abc
from typing import Generator, Optional, Protocol

from sqlalchemy.orm.session import Session

from src import logger, models
from src.models import get_session


class AbstractRepository(Protocol):
    @abc.abstractmethod
    def get_all(self, offset: int = 0, limit: int = 100) -> list[models.MenuItem]:
        ...


class SqliteRepository(AbstractRepository):
    def __init__(self, session: Session):
        self.session = session

    def get_all(self, offset: int = 0, limit: int = 100) -> list[models.MenuItem]:
        if limit > 100:
            limit = 100

        menu_items = (
            self.session.query(models.MenuItem).offset(offset).limit(limit).all()
        )
        return menu_items


class FakeRepository(AbstractRepository):
    def __init__(self, db: Optional[list[models.MenuItem]] = None):
        self._db = db or []

    def get_all(self, offset: int = 0, limit: int = 100) -> list[models.MenuItem]:
        if limit > 100:
            limit = 100

        return self._db[offset : limit + offset]


def create_default() -> Generator[AbstractRepository, None, None]:
    with get_session() as session:
        default_repo = SqliteRepository(session=session)

        logger.info(f"Create repository: {default_repo.__class__}")
        yield default_repo
