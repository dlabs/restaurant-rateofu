import Order from '../models/order';
import OrderItem, { OrderItemWithID } from '../models/order-item';

/**
 * Adds a new OrderItem document to DB or updates an existing one
 * if one can be already found in the DB with the new item's _id.
 * @param newOrderItem The order item data.
 */
export async function putOrderItem(
    newOrderItem: OrderItemWithID
): Promise<void> {
    // Update order item model
    const currentOrderItem = await OrderItem.findById(newOrderItem._id);

    if (!currentOrderItem) {
        await OrderItem.create(newOrderItem);
        return;
    }

    await currentOrderItem.update({ itemStatus: newOrderItem.itemStatus });

    // Update order model
    await Order.updateOne(
        {
            'orderItems._id': {
                $eq: newOrderItem._id,
            },
        },
        {
            $set: {
                'orderItems.$.itemStatus': newOrderItem.itemStatus,
            },
        }
    );
}
