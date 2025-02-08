import { FavoritesWithoutId } from '@/GlobalTypes/Favorites';
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryCustom from '../baseQuery';

const favoriteMovieApi = createApi({
  reducerPath: 'favoriteMovieA/api',
  baseQuery: (...args) => baseQueryCustom(...args, true),
  endpoints: build => ({
    addFavoritesMovies: build.mutation<
      any,
      { data: FavoritesWithoutId; id: string }
    >({
      query: ({ data, id }) => ({
        url: `favorite-movies/add/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddFavoritesMoviesMutation } = favoriteMovieApi;
export default favoriteMovieApi;
