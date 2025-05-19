import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    selectedProduct: {},
    allProduct: [],
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addToAllProduct: (state, action) => {
      const product = action.payload;
      state.allProduct.push(product);
    },
  },
});

export const { setSelectedProduct, addToAllProduct } = productSlice.actions;
export default productSlice.reducer;
