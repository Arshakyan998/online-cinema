import { createApi } from '@reduxjs/toolkit/query/react';
import { SuccessUpdate, User } from '@/GlobalTypes/User';
import { ICreateUserDate } from '@/GlobalTypes/Auth';
import CustomBaseQuery from '../baseQuery';
const UserProfile = createApi({
  baseQuery: (...args) => CustomBaseQuery(...args, true),
  reducerPath: 'profile/users',
  endpoints: build => ({
    changeAvatarUrl: build.mutation<
      SuccessUpdate,
      { file: FormData; id: string }
    >({
      query: ({ file, id }) => ({
        url: `user/avatar/${id}`,
        body: file,
        method: 'POST',
        headers: {},
      }),
    }),
  }),
});

export const { useChangeAvatarUrlMutation } = UserProfile;
export default UserProfile;
