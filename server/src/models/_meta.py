from contextlib import contextmanager
from typing import Generator
from uuid import uuid4

import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import Session, sessionmaker

from src import logger, settings


class BaseModel:
    id = sa.Column(
        sa.String, default=lambda: str(uuid4()), primary_key=True, index=True
    )

    created_at = sa.Column(
        sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
    )
    updated_at = sa.Column(
        sa.DateTime(timezone=True),
        server_default=sa.func.now(),
        onupdate=sa.func.now(),
        nullable=False,
    )
    deleted_at = sa.Column(sa.DateTime(timezone=True))


Base = declarative_base(cls=BaseModel)

engine = sa.create_engine(settings.sqlite_url, connect_args={"check_same_thread": True})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@contextmanager
def get_session() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        logger.info("open db session")
        yield session
    finally:
        logger.info("close db session")
        session.close()
