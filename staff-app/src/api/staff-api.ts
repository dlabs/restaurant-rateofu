import ax from "./index";
import { StaffRoles } from "../components/Auth/staff-roles.enum";
import { AuthResponseModel, OrderModel, ServeOrderBatchRequest, UpdateOrderItemStatusRequest } from "./api-models";

export const getRoles = (): Promise<StaffRoles[]> =>
    Promise.resolve([StaffRoles.BARTENDER, StaffRoles.CHEF, StaffRoles.WAITER]);

export const auth = (name: string, role: string): Promise<AuthResponseModel> =>
    ax.post("staff/authenticate", {
        name,
        role,
    });

export const getPendingOrders = (): Promise<OrderModel[]> =>
    ax.get("staff/orders");

export const updateOrderItemStatus = (data: UpdateOrderItemStatusRequest): Promise<boolean> =>
    ax.patch(`staff/orders/${data.orderId}/items/${data.orderItemId}`, {
        accessToken: data.accessToken,
        newStatus: data.newStatus,
    });

export const markOrderBatchAsServed = (data: ServeOrderBatchRequest): Promise<boolean> =>
    ax.post(`staff/orders/${data.orderId}/batches/${data.batchType}/serve`, {
        accessToken: data.accessToken,
    });
