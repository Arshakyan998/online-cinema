import { createApi } from '@reduxjs/toolkit/query/react';
import { ICreateUserDate } from '@/GlobalTypes/Auth';
import CustomBaseQuery from '../baseQuery';
import { User } from './types';
const Auth = createApi({
  baseQuery: (...args) => CustomBaseQuery(...args, true),
  reducerPath: 'auth/users',
  endpoints: build => ({
    createUser: build.mutation<User, ICreateUserDate>({
      query: body => ({
        url: 'auth/create',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateUserMutation } = Auth;
export default Auth;
