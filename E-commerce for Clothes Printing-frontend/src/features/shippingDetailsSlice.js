import { createSlice } from "@reduxjs/toolkit";

const shippingDetailsSlice = createSlice({
  name: "shippingDetails",
  initialState: {
    userDetails: {},
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = shippingDetailsSlice.actions;
export default shippingDetailsSlice.reducer;
