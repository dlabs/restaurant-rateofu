import { Router } from 'express';
import { getAllMenuItemsController } from '../controllers/menu-items';

const router = Router();

router.get('/', getAllMenuItemsController);

export default router;
