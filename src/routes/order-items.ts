import { Router } from 'express';
import { checkToken } from '../middleware/auth';
import { putOrderItemController } from '../controllers/order-items';

const orderItemRouter = Router();

orderItemRouter.use(checkToken);
orderItemRouter.put('/:id', putOrderItemController);

export default orderItemRouter;
