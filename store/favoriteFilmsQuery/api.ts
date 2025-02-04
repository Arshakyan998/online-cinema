import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryCustom from '../baseQuery';

const favoriteMovieApi = createApi({
  reducerPath: 'favoriteMovieA/api',
  baseQuery: (...args) => baseQueryCustom(...args, true),
  endpoints: build => ({
    addFavoritesMovies: build.mutation({
      query: data => ({}),
    }),
  }),
});

export const { useAddFavoritesMoviesMutation } = favoriteMovieApi;
export default favoriteMovieApi;
