import baseQuery from "../baseQuery";
import { extractRehydrationInfo } from "../hydrate";

import { IData } from "../types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const filmsApi = createApi({
  reducerPath: "getFilms",
  baseQuery,
  extractRehydrationInfo,
  endpoints: (builder) => ({
    getFilms: builder.query<IData<"items">, undefined>({
      query: () => ({
        url: "/v2.2/films/collections",
        method: "GET",
        query: {
          order: "rating",
        },

        params: {
          ratingFrom: 9,
          page: 1,
        },
      }),
      transformResponse: (res: IData<"items">) => {
        return { ...res, items: res.items.slice(0, 3) };
      },
    }),
  }),
});

export default filmsApi;
