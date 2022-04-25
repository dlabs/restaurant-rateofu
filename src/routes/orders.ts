import { Router } from 'express';
import {
    addNewOrderController,
    getOrderByIdController,
    getOrdersByFinishedItemsController,
} from '../controllers/orders';

const ordersRouter = Router();

ordersRouter.post('/', addNewOrderController);
ordersRouter.get('/:id', getOrderByIdController);

// Set a default request param for GET /api/orders;
// if the `has_unfinished_items` param is not defined, set it to true by default
ordersRouter.use((req, res, next) => {
    const unfinishedItemsKey = 'has_unfinished_items';
    req.query[unfinishedItemsKey] = req.query[unfinishedItemsKey] ?? 'true';
    next();
});
ordersRouter.get('/', getOrdersByFinishedItemsController);

export default ordersRouter;
