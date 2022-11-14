import logging

from src.settings import settings

__version__ = "0.0.1"

logger = logging.getLogger("rateofu")
logger.setLevel(settings.log_level.upper())

# Stream Handler
s_handler = logging.StreamHandler()
s_handler.setLevel(settings.log_level.upper())
s_handler.setFormatter(logging.Formatter("%(name)s - %(levelname)s - %(message)s"))

logger.addHandler(s_handler)
