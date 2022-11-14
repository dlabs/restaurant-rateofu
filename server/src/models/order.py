import sqlalchemy as sa
from sqlalchemy.orm import relationship

from src.models._meta import Base


class Order(Base):
    __tablename__ = "orders"

    table_id = sa.Column(sa.String, sa.ForeignKey("tables.id"), nullable=False)
    table = relationship("Table", back_populates="orders")

    order_items = relationship("OrderItem", back_populates="order")
