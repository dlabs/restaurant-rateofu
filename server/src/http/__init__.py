from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src import logger
from src.http import routes

app = FastAPI()
api = FastAPI()

# TODO: This should be much more restricted!
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/status")
def status():
    return {"status": "ok"}


api.include_router(routes.auth_router)
api.include_router(routes.menu_item_router)
api.include_router(routes.order_item_router)
api.include_router(routes.order_router)

app.mount("/api", api)


@app.on_event("startup")
def on_startup():
    logger.info("Starting http app")


@app.on_event("shutdown")
def on_shutdown():
    logger.info("Closing http app")
