import baseQuery from "../baseQuery";
 import { createApi } from "@reduxjs/toolkit/query/react";
import { IGenre } from "@/GlobalTypes/Genre";

export const genreApi = createApi({
  reducerPath: "getGenres",
  baseQuery,

  endpoints: (builder) => ({
    getGenres: builder.query<IGenre[], undefined>({
      query: () => "v2.2/films/filters",

      transformResponse: (data: { genres: IGenre[] }): IGenre[] => {
        return data.genres;
      },
    }),
  }),
});

export const { useGetGenresQuery } = genreApi;
