import { RequestHandler } from 'express';
import { OrderItemWithID } from '../models/order-item';
import { putOrderItem } from '../services/order-items';

/**
 * Modifies an order item, usually to change its order status.
 * @param req
 * @param res
 */
export async function putOrderItemController(
    req,
    res
): Promise<RequestHandler> {
    const newOrderItem = req.body as OrderItemWithID;

    await putOrderItem(newOrderItem);

    return res.status(200);
}
