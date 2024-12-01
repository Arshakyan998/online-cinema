import { IData } from "../types";
import filmsApi from "./api";

export const extendedApi = filmsApi.injectEndpoints({
  endpoints: (build) => ({
    trendingMovies: build.query<IData<"films">, { type: string; page: number }>(
      {
        query: ({ type, page }) => `v2.2/films/top?type=${type}&page=${page}`,
      }
    ),
  }),
  overrideExisting: false,
});

export const { useTrendingMoviesQuery } = extendedApi;
