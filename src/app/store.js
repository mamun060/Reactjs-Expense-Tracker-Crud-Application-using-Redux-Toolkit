import { configureStore } from "@reduxjs/toolkit";
import transectionReducer from "../features/transaction/transectionSlice";

export const store = configureStore({
    reducer: {
        transection: transectionReducer,
    },
});
