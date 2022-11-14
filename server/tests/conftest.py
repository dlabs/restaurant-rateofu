import pytest
from httpx import AsyncClient
from sqlalchemy.orm import Session

from src import settings
from src.models import get_session


@pytest.fixture
async def client() -> AsyncClient:
    async with AsyncClient(
        base_url=settings.server_url, follow_redirects=True
    ) as client:
        yield client


@pytest.fixture
def session() -> Session:
    with get_session() as session:
        yield session
