import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: [],
  reducers: {
    invoices: (state, action) => {
      state.invoice = action.payload;
    },
  },
});

export const { invoices } = invoiceSlice.actions;

export default invoiceSlice.reducer;
