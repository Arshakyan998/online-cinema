import { createSlice } from "@reduxjs/toolkit";

export const saveGenres = createSlice({
  name: "geners/data",
  initialState: {
    genres: [],
  } as Record<string, []>,
  reducers: {
    saveGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});
