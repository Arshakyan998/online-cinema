import favoriteMovieApi from './api';

const getFavoriteMovies = favoriteMovieApi.injectEndpoints({
  endpoints: build => ({
    getFavorites: build.query<string, string>({
      query: id => ({
        url: `/favorite-movies/${id}`,
      }),
    }),
  }),
});
export const { useGetFavoritesQuery } = getFavoriteMovies;
