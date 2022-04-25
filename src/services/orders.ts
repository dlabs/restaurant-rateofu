import mongoose from 'mongoose';
import MenuItem from '../models/menu-item';
import Order, { IOrder, OrderWithID } from '../models/order';
import OrderItem, { OrderItemWithID } from '../models/order-item';
import { IOrderRequest } from '../types';

/**
 * Processes the request to place / create an order.
 * Creates order items for each ordered menu item,
 * @param orderRequest The body of the request to place a new order.
 * @returns The created order.
 */
export async function addNewOrder(
    orderRequest: IOrderRequest
): Promise<OrderWithID> {
    let orderTotal = 0;
    const allOrderItems: OrderItemWithID[] = [];

    for (const item of orderRequest.items) {
        const menuItem = await MenuItem.findById(item.itemId);
        if (!menuItem) {
            throw new Error(
                `Tried to order an item not on the menu with ID ${item.itemId}`
            );
        }

        // Add price to running total to calculate final order price
        const itemPrice = menuItem.itemPrice;
        orderTotal += itemPrice * item.quantity;

        // Create order items in DB and store them for the Order document
        const orderItems = await createOrderItems(item.itemId, item.quantity);
        allOrderItems.push(...orderItems);
    }

    const order: IOrder = {
        tableId: orderRequest.tableId,
        orderTotal: orderTotal,
        orderItems: allOrderItems,
    };

    const createdOrder = await Order.create(order);
    return {
        _id: createdOrder.id,
        ...order,
    };
}

/**
 * Helper - creates `quantity` order item documents and returns
 * them to be placed in an order document.
 *
 * @param itemId _id of the Menu Item
 * @param quantity Ordered quantity of item
 * @returns The order items to be saved in DB
 */
async function createOrderItems(
    itemId: mongoose.Types.ObjectId,
    quantity: number
): Promise<OrderItemWithID[]> {
    const orderItems: OrderItemWithID[] = [];

    for (let i = 0; i < quantity; i++) {
        // Create item in DB before preparing to return it
        const orderItem = await OrderItem.create({
            itemId: itemId,
            itemStatus: 'ordered',
        });

        orderItems.push({
            _id: orderItem.id,
            itemId: itemId,
            itemStatus: 'ordered',
        });
    }

    return orderItems;
}

/**
 * @param id The _id of the Order
 * @returns The Order from DB if found
 */
export async function getOrderById(id: string): Promise<IOrder | undefined> {
    const order = await Order.findById(id);
    return order;
}

/**
 * Gets orders that either contain all finished items or still
 * have undelivered order items.
 * @param seeUnfinished If true, will return orderes with unfinished items,
 *  else orders with finished items.
 */
export async function getOrdersByFinishedItems(
    seeUnfinished: boolean
): Promise<IOrder[]> {
    const orders = await Order.find({
        'orderItems.itemStatus': {
            [seeUnfinished ? '$in' : '$nin']: [
                'ordered',
                'preparing',
                'ready_to_serve',
            ],
        },
    });

    return orders;
}
