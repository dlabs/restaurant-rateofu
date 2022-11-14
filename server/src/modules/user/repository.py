import abc
from typing import Generator, Literal, Optional, Protocol

from sqlalchemy.orm import Session

from src import logger, models
from src.models import get_session


class AbstractRepository(Protocol):
    @abc.abstractmethod
    def get_by_username_and_role(
        self, username: str, role: Literal["chef", "barman", "waiter"]
    ) -> models.User | None:
        ...


class SqliteRepository(AbstractRepository):
    def __init__(self, session: Session):
        self.session = session

    def get_by_username_and_role(
        self, username: str, role: Literal["chef", "barman", "waiter"]
    ) -> models.User | None:
        user = (
            self.session.query(models.User)
            .filter_by(username=username, role=role)
            .first()
        )
        return user


class FakeRepository(AbstractRepository):
    def __init__(self, db: Optional[list[models.User]] = None):
        self._db = db or []

    def get_by_username_and_role(
        self, username: str, role: Literal["chef", "barman", "waiter"]
    ) -> models.User | None:
        user = next(
            (
                user
                for user in self._db
                if user.username == username and user.role == role
            ),
            None,
        )

        return user


def create_default() -> Generator[AbstractRepository, None, None]:
    with get_session() as session:
        default_repo = SqliteRepository(session=session)

        logger.info(f"Create repository: {default_repo.__class__}")
        yield default_repo
