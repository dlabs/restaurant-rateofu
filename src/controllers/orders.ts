import { RequestHandler } from 'express';
import { IOrder } from '../models/order';
import {
    addNewOrder,
    getOrderById,
    getOrdersByFinishedItems,
} from '../services/orders';
import { IOrderRequest } from '../types';

/**
 * Checks that a request to create an order contains any items,
 * then creates a new order.
 *
 * @param req
 * @param res
 */
export async function addNewOrderController(req, res): Promise<RequestHandler> {
    const body = req.body as IOrderRequest;

    if (body.items.length === 0) {
        return res.status(400).send('Cannot process empty order');
    }

    const newOrder: IOrder = await addNewOrder(body);

    return res.status(201).send(newOrder);
}

/**
 * Attempts to find an order with a specified ID.
 * Responds with a 404 if the order cannot be found.
 * @param req
 * @param res
 */
export async function getOrderByIdController(
    req,
    res
): Promise<RequestHandler> {
    const order = await getOrderById(req.params.id);

    if (!order) {
        return res.sendStatus(404);
    }

    res.status(200).send(order);
}

export async function getOrdersByFinishedItemsController(
    req,
    res
): Promise<RequestHandler> {
    const seeUnfinished =
        req.query['has_unfinished_items'] === 'false' ? false : true;

    const orders = await getOrdersByFinishedItems(seeUnfinished);

    return res.status(200).send(orders);
}
