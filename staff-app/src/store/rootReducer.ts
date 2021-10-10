import { combineReducers } from "@reduxjs/toolkit";

import staffReducer from "./slices/staff-slice.reducer";

const rootReducer = combineReducers({ staffReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
