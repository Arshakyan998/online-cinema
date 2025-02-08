import { IResponseAnswer } from '../types';
import favoriteMovieApi from './api';

const favoriteMovies = favoriteMovieApi.injectEndpoints({
  endpoints: build => ({
    getFavorites: build.query<string, string>({
      query: id => ({
        url: `favorite-movies/${id}`,
      }),
    }),

    getFavoritesForChecking: build.query<Record<number, string>, string>({
      query: id => ({
        url: `favorite-movies/for-checking/${id}`,
      }),
    }),
    RemovefavoriteMovies: build.query<
      IResponseAnswer,
      { userId: string; filmId: string }
    >({
      query: ({ filmId, userId }) => ({
        url: `favorite-movies/${userId}/remove/${filmId}`,
        method: 'DELETE',
      }),
    }),
  }),
});
export const {
  useGetFavoritesQuery,
  useLazyGetFavoritesForCheckingQuery,
  useLazyRemovefavoriteMoviesQuery,
} = favoriteMovies;
