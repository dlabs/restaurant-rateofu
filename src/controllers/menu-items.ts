import { RequestHandler } from 'express';
import MenuItem from '../models/menu-item';

/**
 * Returns the list of all items on the menu.
 * Due to its simplicity, the controller handles the request fully
 * instead of passing to services.
 *
 * @param req
 * @param res
 */
export async function getAllMenuItemsController(
    req,
    res
): Promise<RequestHandler> {
    const menuItems = await MenuItem.find({});
    return res.status(200).send(menuItems);
}
