import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../baseQuery';

const commentsApi = createApi({
  baseQuery: (...args) => customBaseQuery(...args, true),
  endpoints: builder => ({
    addComment: builder.query({
      query: () => ({
        url: `/comments/data`,
      }),
    }),
  }),
});

export default commentsApi;
