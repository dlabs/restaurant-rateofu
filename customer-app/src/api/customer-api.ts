import ax from "./index";

import { ProductModel } from 'models'

export const getAvailableProducts = (): Promise<ProductModel> => ax.get("products");
