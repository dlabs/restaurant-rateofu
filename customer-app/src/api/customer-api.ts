import ax from "./index";

import { ProductModel } from "models";

export const getAvailableProducts = (): Promise<ProductModel> =>
    ax.get("products");

export const submitOrder = (
    orderItems: { productId: number; quantity: number }[],
    tableNo: number
): Promise<{ totalAmount: number }> =>
    ax.post("customer/orders", { items: orderItems, tableNo });
