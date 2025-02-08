import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tokens, User } from '@/GlobalTypes/User';

const userSlice = createSlice({
  initialState: {
    user: {} as User,
  },
  name: 'user/data',
  reducers: {
    saveUser: (state, data: PayloadAction<User>) => {
      state.user = data.payload;
    },
  },
});

export default userSlice;
export const { saveUser } = userSlice.actions;
