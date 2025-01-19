import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";
import searchSlice from "./features/search/searchSlice";
import billSlice from "./features/bill/billSlice";
import invoiceSlice from "./features/invoice/invoiceSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    search: searchSlice,
    bill: billSlice,
    invoice: invoiceSlice,
  },
});
