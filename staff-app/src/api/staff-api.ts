import ax from "./index";
import { StaffRoles } from "../components/Auth/staff-roles.enum";
import { AuthResponseModel, OrderItemStatus, OrderModel } from "./api-models";

export const getRoles = (): Promise<StaffRoles[]> =>
    Promise.resolve([StaffRoles.BARTENDER, StaffRoles.CHEF, StaffRoles.WAITER]);

export const auth = (name: string, role: string): Promise<AuthResponseModel> =>
    ax.post("staff/authenticate", {
        name,
        role,
    });

export const getPendingOrders = (): Promise<OrderModel[]> =>
    ax.get("staff/orders");

export const updateOrderItemStatus = (data: {
    orderId: number;
    orderItemId: number;
    accessToken: string;
    newStatus: OrderItemStatus;
}): Promise<boolean> =>
    ax.patch(`staff/orders/${data.orderId}/items/${data.orderItemId}`, {
        accessToken: data.accessToken,
        newStatus: data.newStatus,
    });
