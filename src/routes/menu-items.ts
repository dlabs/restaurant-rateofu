import { Router } from 'express';
import { getAllMenuItemsController } from '../controllers/menu-items';

const menuItemsRouter = Router();

menuItemsRouter.get('/', getAllMenuItemsController);

export default menuItemsRouter;
