import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import shippingDetailsReducers from "../features/shippingDetailsSlice";
import ordersReducers from "../features/ordersSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    shippingDetails: shippingDetailsReducers,
    orders: ordersReducers,
  },
});
