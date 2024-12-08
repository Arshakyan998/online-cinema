import baseQuery from "../baseQuery";
import { HYDRATE } from "next-redux-wrapper";
import { createApi } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "getGenres",
  baseQuery,

  endpoints: (builder) => ({
    getGenres: builder.query<Array<{ genre: string; id: number }>, undefined>({
      query: () => "v2.2/films/filters",

      transformResponse: (data: {
        genres: Array<{ genre: string; id: number }>;
      }): Array<{ genre: string; id: number }> => {
        return data.genres;
      },
    }),
  }),
});

export const { useGetGenresQuery } = genreApi;
