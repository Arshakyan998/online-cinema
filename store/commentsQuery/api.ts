import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../baseQuery';
import { IResponseAnswer } from '../../GlobalTypes/Film';
import { IAddComment } from './type';

const commentsApi = createApi({
  reducerPath: 'comments/api',
  baseQuery: (...args) => customBaseQuery(...args, true),
  endpoints: builder => ({
    addComment: builder.mutation<IResponseAnswer, IAddComment>({
      query: body => ({
        url: `/comments/add`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddCommentMutation } = commentsApi;

export default commentsApi;
