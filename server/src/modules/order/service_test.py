from random import choice

from src import models

from . import service


def test_group_orders():
    orders = [
        models.Order(
            id=f"mock-order-{i}",
            table_id=f"mock-table-{i}",
        )
        for i in range(10)
    ]

    order_items: list[models.OrderItem] = []
    for i in range(100):
        order = choice(orders)
        order_items.append(
            models.OrderItem(
                id=f"mock-order-item-{i}",
                order_id=order.id,
                order=order,
            )
        )

    result = service.group_orders(order_items)

    assert isinstance(result, list)
    assert all(isinstance(order, models.Order) for order in result)
