import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header/data',
  initialState: {
    visibility: true,
  },
  reducers: {
    changeVisibility: (state, data: PayloadAction<boolean>) => {
      state.visibility = data.payload;
    },
  },
});
export default headerSlice