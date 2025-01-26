import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
  },
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
  },
});

export const { setInvoices, addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
