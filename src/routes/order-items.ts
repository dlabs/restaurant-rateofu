import { Router } from 'express';
import { putOrderItemController } from '../controllers/order-items';

const orderItemRouter = Router();

orderItemRouter.put('/:id', putOrderItemController);

export default orderItemRouter;
