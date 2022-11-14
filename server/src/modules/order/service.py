from itertools import groupby

from src import models


def group_orders(order_items: list[models.OrderItem]) -> list[models.Order]:
    orders: list[models.Order] = []

    for order_id, grp in groupby(order_items, lambda order_item: order_item.order_id):
        current_order_items = list(grp)

        table_id = current_order_items[0].order.table_id

        orders.append(
            models.Order(
                id=order_id,
                table_id=table_id,
                order_items=current_order_items,
            )
        )

    return orders
