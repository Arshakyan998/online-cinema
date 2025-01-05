import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

const userSlice = createSlice({
  initialState: {
    user: {},
  } as Record<'user', User>,
  name: 'user/data',
  reducers: {
    saveUser: (state, data: PayloadAction<User>) => {
      state.user = data.payload;
    },
  },
});

export default userSlice;
