import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
  },
  reducers: {
    addToOrders: (state, action) => {
      const order = action.payload;
      state.allOrders.push(order);
    },
  },
});

export const { addToOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
