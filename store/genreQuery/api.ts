import baseQuery from "../baseQuery";
import { HYDRATE } from "next-redux-wrapper";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "getGenres",
  baseQuery,

  endpoints: (builder) => ({
    getGenres: builder.query<{ gengenresre: { genre: string[] } }, undefined>({
      query: () => "v2.2/films/filters",

      transformResponse: (data: {
        genres: Array<{ genre: string; id: number }>;
      }): Record<string, number> => {
        return data.genres.reduce((aggr, el) => {
          aggr[el.genre] = aggr[el.genre] + 1 || 1;
          return aggr;
        }, {});
      },
    }),
  }),
});

export const { useGetGenresQuery } = genreApi;
