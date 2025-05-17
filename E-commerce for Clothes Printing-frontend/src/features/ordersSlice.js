import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    selectedOrder: {},
  },
  reducers: {
    addToOrders: (state, action) => {
      const order = action.payload;
      state.allOrders.push(order);
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { addToOrders, setSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
