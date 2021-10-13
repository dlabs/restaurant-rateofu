import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    AuthResponseModel,
    OrderItemStatus,
    OrderModel,
    ServeOrderBatchRequest,
    UpdateOrderItemStatusRequest,
} from "api/api-models";

import {
    auth,
    getPendingOrders,
    markOrderBatchAsServed,
    updateOrderItemStatus,
} from "../../api/staff-api";
import { StaffRoles } from "../../components/Auth/staff-roles.enum";

interface StaffState {
    accessToken: string | null;
    staffId: number | null;
    role: StaffRoles | null;
    orders: OrderModel[];
    batchesToBeServed: BatchToServe[];
}

interface BatchToServe {
    orderId: number;

    batchType: "drink" | "food";
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
    batchesToBeServed: [], // * This state field is for waiters only; There could be a better solution to this though;
};

interface AuthRequestModel {
    name: string;
    role: StaffRoles;
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

const serveOrderBatch = createAsyncThunk(
    "staff/serve",
    async (req: ServeOrderBatchRequest): Promise<boolean> =>
        markOrderBatchAsServed(req)
);

const handleNewServerMessage = (
    state: StaffState,
    action: PayloadAction<ServerEvent>
) => {
    const serverEvent = action.payload;
    // * Return new state to update changes
    switch (serverEvent.event) {
        case "newOrder":
            const newOrders = [...state.orders];
            newOrders.unshift(serverEvent.payload as OrderModel);
            return { ...state, orders: newOrders };
        case "orderItemStatusChanged":
            const { orderItemId, newStatus, processedBy } = serverEvent.payload;

            const updatedOrders = state.orders.map((o) => {
                if (o.orderItems.find((oi) => oi.id === orderItemId)) {
                    return {
                        ...o,
                        orderItems: o.orderItems.map((oi) => {
                            if (oi.id === orderItemId) {
                                return {
                                    ...oi,
                                    status: newStatus,
                                    processedBy,
                                };
                            }
                            return oi;
                        }),
                    };
                }
                return o;
            });

            return { ...state, orders: updatedOrders };
        case "multipleOrderItemsStatusChanged":
            const newUpdatedOrders = state.orders.map((o) => {
                if (
                    o.orderItems.find(
                        (oi) => oi.id === serverEvent.payload[0].orderItemId
                    )
                ) {
                    return {
                        ...o,
                        orderItems: o.orderItems.map((oi) => {
                            const targetServerOrderItem: {
                                orderItemId: number;
                                newStatus: OrderItemStatus;
                                processedBy: number | null;
                            } = serverEvent.payload.find(
                                (serverOi: {
                                    orderItemId: number;
                                    newStatus: OrderItemStatus;
                                    processedBy: number | null;
                                }) => serverOi.orderItemId === oi.id
                            );
                            if (targetServerOrderItem) {
                                return {
                                    ...oi,
                                    status: targetServerOrderItem.newStatus,
                                    processedBy:
                                        targetServerOrderItem.processedBy,
                                };
                            }
                            return oi;
                        }),
                    };
                }
                return o;
            });
            return { ...state, orders: newUpdatedOrders };
        case "orderCompleted":
            return {
                ...state,
                orders: state.orders.map((o) =>
                    o.id === serverEvent.payload.orderId
                        ? { ...o, isCompleted: true }
                        : o
                ),
            };
        case "batchReady":
            // * Role check is not necessary (BE emits event only to Waiter WS connections)
            const newBatchesToBeServed = [...state.batchesToBeServed];
            newBatchesToBeServed.unshift(serverEvent.payload);
            return { ...state, batchesToBeServed: newBatchesToBeServed };
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
        builder.addCase(serveOrderBatch.fulfilled, (state, action) => {
            const batchIdx = state.batchesToBeServed.findIndex(
                (bts) =>
                    bts.orderId === action.meta.arg.orderId &&
                    bts.batchType === action.meta.arg.batchType
            );
            state.batchesToBeServed.splice(batchIdx, 1);
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
    serveOrderBatch,
};
