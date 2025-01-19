import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: {
      name: "",
      retailPrice: "",
      wholesalePrice: "",
      purchasePrice: "",
      quantity: "",
      variants: "",
      weight: "",
    },
    loading: false, // Add loading state to the initialState
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (val) => val.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((val) => {
        return val.id === action.payload.id ? action.payload : val;
      });
    },
    setLoading: (state, action) => {
      // Add setLoading to manage the loading state
      state.loading = action.payload;
    },

    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  setProducts,
  setLoading,
  setCurrentProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
