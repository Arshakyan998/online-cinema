import { EditUser, SuccessUpdate } from '@/GlobalTypes/User';
import UserProfile from './api';

const editUserApi = UserProfile.injectEndpoints({
  endpoints: builder => ({
    editUserProfile: builder.mutation<
      SuccessUpdate,
      { data: EditUser; id: string }
    >({
      query: ({ data, id }) => ({
        url: `user/edit/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useEditUserProfileMutation } = editUserApi;
