from sqlalchemy.orm import relationship

from src.models._meta import Base


class Table(Base):
    __tablename__ = "tables"

    orders = relationship("Order", back_populates="table")
