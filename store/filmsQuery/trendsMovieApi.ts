import { IData } from "../../GlobalTypes/Film";
import filmsApi from "./api";

export const extendedFilmsApi = filmsApi.injectEndpoints({
  endpoints: (build) => ({
    trendingMovies: build.query<IData<"films">, { type: string; page: number }>(
      {
        query: ({ type, page }) => `v2.2/films/top?type=${type}&page=${page}`,
      }
    ),

    getByGenre: build.query<
      IData<"films">,
      { genres: (number | string)[]; page?: number }
    >({
      query: ({ genres, page = 1 }) => ({
        url: "v2.2/films",
        params: {
          genres: genres[0],
          order: "RATING",
          page,
        },
      }),
      transformResponse: (data: Partial<IData<"items">>): IData<"films"> => {
        const transformData = {
          ...data,
          films: [...(data.items || [])],
        };
        delete transformData.items;

        return transformData as Required<IData<"films">>;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useTrendingMoviesQuery, useLazyGetByGenreQuery } =
  extendedFilmsApi;
