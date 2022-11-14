import sqlalchemy as sa
from sqlalchemy.orm import relationship

from ._meta import Base


class MenuItem(Base):
    __tablename__ = "menu_items"

    order_items = relationship("OrderItem", back_populates="menu_item")

    title = sa.Column(sa.String, nullable=False, index=True)
    price = sa.Column(sa.Float, nullable=False)
    description = sa.Column(sa.String)
    type = sa.Column(sa.String, sa.CheckConstraint("type in ('food', 'drink')"))
    image = sa.Column(sa.String)
