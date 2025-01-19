import { createSlice } from "@reduxjs/toolkit";

export const billSlice = createSlice({
  name: "bill",
  initialState: [{}],
  reducers: {
    addBill: (state, action) => {
      state.push(action.payload);
    },
    updateBill: (state, action) => {
      state = state.map((bill) =>
        bill.id === action.payload.id ? action.payload : bill
      );
    },
  },
});

export const { addBill, updateBill } = billSlice.actions;

export default billSlice.reducer;
