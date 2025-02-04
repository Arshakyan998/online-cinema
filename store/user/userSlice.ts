import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tokens, User } from '@/GlobalTypes/User';

const userSlice = createSlice({
  initialState: {
    user: {} as User,
    tokens: {} as Tokens,
  },
  name: 'user/data',
  reducers: {
    saveUser: (state, data: PayloadAction<User>) => {
      state.user = data.payload;
    },
    saveTokens: (state, data: PayloadAction<Tokens>) => {
      state.tokens = data.payload;
    },
  },
});

export default userSlice;
export const { saveTokens, saveUser } = userSlice.actions;
