import { createApi } from '@reduxjs/toolkit/query/react';
import { ICreateUserDate } from '@/GlobalTypes/Auth';
import CustomBaseQuery from '../baseQuery';
import { IResponseAnswer } from '../../GlobalTypes/Film';
import { User } from '@/GlobalTypes/User';
const Auth = createApi({
  reducerPath: 'auth/users',
  baseQuery: (...args) => CustomBaseQuery(...args, true),
  endpoints: build => ({
    createUser: build.mutation<User, ICreateUserDate>({
      query: body => ({
        url: 'auth/create',
        body,
        method: 'POST',
      }),
    }),

    sendMail: build.mutation<IResponseAnswer, string>({
      query: email => ({
        url: 'email/send-email',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),

    verifyMail: build.mutation<
      IResponseAnswer,
      { email: string; verificationCode: string }
    >({
      query: ({ email, verificationCode }) => ({
        url: 'email/verify-email',
        method: 'POST',
        body: {
          email,
          code: verificationCode,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSendMailMutation,
  useVerifyMailMutation,
} = Auth;
export default Auth;
