import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import { productsApi } from "./api/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(orderApi.middleware),
});

setupListeners(store.dispatch);
