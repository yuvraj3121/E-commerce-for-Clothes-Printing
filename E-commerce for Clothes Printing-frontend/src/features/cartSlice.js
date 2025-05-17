import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCount: 0,
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    incrementCartCount: (state) => {
      state.cartCount += 1;
    },
    decrementCartCount: (state) => {
      if (state.cartCount > 0) {
        state.cartCount -= 1;
      }
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
});

export const {
  incrementCartCount,
  decrementCartCount,
  setCartCount,
  addToCart,
  removeFromCart,
  updateQuantity,
  setTotalAmount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
