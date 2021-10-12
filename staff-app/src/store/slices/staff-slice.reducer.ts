import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseModel, OrderItemStatus, OrderModel } from "api/api-models";

import {
    auth,
    getPendingOrders,
    updateOrderItemStatus,
} from "../../api/staff-api";
import { StaffRoles } from "../../components/Auth/staff-roles.enum";

interface StaffState {
    accessToken: string | null;
    staffId: number | null;
    role: StaffRoles | null;
    orders: OrderModel[];
}

interface ServerEvent {
    event: string; // * consider typing this strongly
    payload: any;
}

const initialState: StaffState = {
    accessToken: null,
    role: null,
    staffId: null,
    orders: [],
};

interface AuthRequestModel {
    name: string;
    role: StaffRoles;
}

interface UpdateOrderItemStatusRequest {
    accessToken: string;
    orderId: number;
    orderItemId: number;
    newStatus: OrderItemStatus;
}

const authenticate = createAsyncThunk(
    "staff/authenticate",
    async (req: AuthRequestModel): Promise<AuthResponseModel> => {
        return auth(req.name, req.role);
    }
);

const requestOrders = createAsyncThunk(
    "staff/orders",
    async (): Promise<OrderModel[]> => getPendingOrders()
);

const executeOrderItemStatusUpdate = createAsyncThunk(
    "staff/updateItem",
    async (req: UpdateOrderItemStatusRequest): Promise<boolean> =>
        updateOrderItemStatus(req)
);

const handleNewServerMessage = (
    state: StaffState,
    action: PayloadAction<ServerEvent>
) => {
    const serverEvent = action.payload;
    console.log(serverEvent);
    // * Return new state to update changes
    switch (serverEvent.event) {
        case "newOrder":
            const newOrders = [...state.orders];
            newOrders.unshift(serverEvent.payload as OrderModel);
            return { ...state, orders: newOrders };
        case "orderItemStatusChanged":
            const { orderItemId, newStatus } = serverEvent.payload;

            const updatedOrders = state.orders.map((o) => {
                if (o.orderItems.find((oi) => oi.id === orderItemId)) {
                    return {
                        ...o,
                        orderItems: o.orderItems.map((oi) => {
                            if (oi.id === orderItemId) {
                                return {
                                    ...oi,
                                    status: newStatus,
                                };
                            }
                            return oi;
                        }),
                    };
                }
                return o;
            });

            return { ...state, orders: updatedOrders };
    }
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        onServerMessage: handleNewServerMessage,
    },
    extraReducers: (builder) => {
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.staffId = action.payload.staffId;
            state.role = action.meta.arg.role;
        });
        builder.addCase(requestOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
});

const { onServerMessage } = staffSlice.actions;

export default staffSlice.reducer;
export {
    authenticate,
    onServerMessage,
    requestOrders,
    executeOrderItemStatusUpdate,
};
