import sqlalchemy as sa

from src.models._meta import Base


class User(Base):
    __tablename__ = "users"

    username = sa.Column(sa.String, nullable=False, index=True, unique=True)
    role = sa.Column(
        sa.String,
        sa.CheckConstraint("role in ( 'chef', 'barman', 'waiter' )"),
        nullable=False,
    )
