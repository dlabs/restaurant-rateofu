export enum OrderItemStatus {
    AWAITING = "awaiting",
    SERVED = "served",
    IN_PROCESS = "in_process",
    READY = "ready",
}

export interface AuthResponseModel {
    accessToken: string;
    staffId: number;
}

export interface ProductModel {
    id: number;

    name: string;

    type: "drink" | "food";

    price: string;

    imageUrl: string;
}

export interface OrderItemModel {
    id: number;

    productId: number;

    orderId: number;

    status: OrderItemStatus;

    processedBy: number;

    product: ProductModel;
}

export interface OrderModel {
    id: number;

    tableNo: number;

    totalAmount: string;

    isCompleted: boolean;

    createdAt: Date;

    orderItems: OrderItemModel[];
}
