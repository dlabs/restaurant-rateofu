from typing import Literal

from pydantic import BaseSettings


class Settings(BaseSettings):
    server_port: int
    server_test_port: int
    env: Literal["prod", "dev", "test"] = "dev"

    log_level: str

    sqlite_file_location: str
    sqlite_test_file_location: str

    jwt_expired_after_minutes: int = 15
    jwt_algorithm: str = "HS256"
    jwt_secret: str

    @property
    def server_url(self):
        if self.env == "test":
            return f"http://localhost:{settings.server_test_port}"
        return f"http://localhost:{settings.server_port}"

    @property
    def sqlite_url(self):
        if self.env == "test":
            return f"sqlite:///{self.sqlite_test_file_location}"
        return f"sqlite:///{self.sqlite_file_location}"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
