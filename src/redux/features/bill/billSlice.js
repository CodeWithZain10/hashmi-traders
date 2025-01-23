import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Proper structure for storing products in the bill
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addProductToBill: (state, action) => {
      state.products.push(action.payload); // Push product into the bill's products array
    },
    addBill: (state, action) => {
      state.products = [...state.products, ...action.payload]; // Add multiple products
    },
    updateBill: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      ); // Update a specific product in the bill
    },
  },
});

export const { addBill, updateBill, addProductToBill } = billSlice.actions;

export default billSlice.reducer;
