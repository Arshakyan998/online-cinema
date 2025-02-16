import { createApi } from '@reduxjs/toolkit/query/react';
import { extractRehydrationInfo } from '../hydrate';

import baseQuery from '../baseQuery';
import { IFilm } from './type';

export const filmApiGetById = createApi({
  reducerPath: 'getFilmById/api',
  baseQuery,
  extractRehydrationInfo,
  endpoints: builder => ({
    getFilmBydId: builder.query<IFilm, { id: string }>({
      query: ({ id }) => ({
        url: `/v2.2/films/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
