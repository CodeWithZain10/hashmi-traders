import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
