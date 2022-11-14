import pytest
from httpx import AsyncClient

from src import settings
from src.http import app


@pytest.fixture
async def client() -> AsyncClient:
    async with AsyncClient(
        app=app, base_url=settings.server_url, follow_redirects=True
    ) as client:
        yield client
