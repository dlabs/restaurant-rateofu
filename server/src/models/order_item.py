import sqlalchemy as sa
from sqlalchemy.orm import relationship

from src.models._meta import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    order_id = sa.Column(
        sa.String,
        sa.ForeignKey("orders.id"),
        index=True,
        nullable=False,
    )
    order = relationship("Order", back_populates="order_items")

    menu_item_id = sa.Column(
        sa.String,
        sa.ForeignKey("menu_items.id"),
        index=True,
        nullable=False,
    )
    menu_item = relationship("MenuItem", back_populates="order_items")

    quantity = sa.Column(sa.Integer, nullable=False)
    status = sa.Column(
        sa.String,
        sa.CheckConstraint(
            "status in ( 'ordered', 'preparing', 'ready_to_serve', 'delivered' )"
        ),
        nullable=False,
        server_default="ordered",
    )
