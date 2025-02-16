import { ICreateUserDate } from '@/GlobalTypes/Auth';
import { Tokens, User } from '@/GlobalTypes/User';
import { IResponseAnswer } from '../../GlobalTypes/Film';
import Auth from './api';

const loginApi = Auth.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<User, Pick<ICreateUserDate, 'email' | 'password'>>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getUser: build.query<User, string>({
      query: token => ({
        url: '/auth/get_user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
      }),
    }),

    refreshTokens: build.query<Tokens, string>({
      query: token => ({
        url: '/auth/refresh',
        headers: {
          Authorization: `Bearer ${token}`,
        },

        method: 'POST',
      }),
    }),

    logOut: build.query<IResponseAnswer, string>({
      query: id => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyGetUserQuery } = loginApi;
export default loginApi;
