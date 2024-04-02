// categoriesSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    addCategories: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { addCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
