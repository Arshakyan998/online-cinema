import { IGenre } from '@/GlobalTypes/Genre';
import { createSlice } from '@reduxjs/toolkit';

export const saveGenres = createSlice({
  name: 'geners/data',
  initialState: {
    genres: [],
  } as Record<'genres', IGenre[]>,
  reducers: {
    saveGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});
