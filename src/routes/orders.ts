import { Router } from 'express';
import {
    addNewOrderController,
    getOrderByIdController,
} from '../controllers/orders';

const ordersRouter = Router();

ordersRouter.post('/', addNewOrderController);
ordersRouter.get('/:id', getOrderByIdController);

export default ordersRouter;
