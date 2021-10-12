import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderModel } from "api/api-models";

import { auth, getPendingOrders } from "../../api/staff-api";
import { StaffRoles } from "../../components/Auth/staff-roles.enum";

interface StaffState {
    accessToken: string | null;
    role: StaffRoles | null;
    orders: OrderModel[];
}

interface ServerEvent {
    event: string; // * consider typing this strongly
    payload: object;
}

const initialState: StaffState = { accessToken: null, role: null, orders: [] };

interface AuthRequestModel {
    name: string;
    role: StaffRoles;
}
interface AuthResponseModel {
    accessToken: string;
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

const handleNewServerMessage = (
    state: StaffState,
    action: PayloadAction<ServerEvent>
) => {
    const serverEvent = action.payload;
    console.log(serverEvent);
    // * Return new state to update changes
    switch (serverEvent.event) {
        case "newOrder":
            return state;
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
            state.role = action.meta.arg.role;
        });
        builder.addCase(requestOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
});

const { onServerMessage } = staffSlice.actions;

export default staffSlice.reducer;
export { authenticate, onServerMessage, requestOrders };
