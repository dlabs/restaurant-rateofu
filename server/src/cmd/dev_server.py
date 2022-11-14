import uvicorn

from src import settings
from src.models import *
from src.models._meta import Base, engine

if __name__ == "__main__":
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    uvicorn.run("src.http:app", port=settings.server_port, reload=True, workers=1)
