import { configureStore } from '@reduxjs/toolkit';

import { filmApiGetById } from './filmBySymbolQuery/api';
import { saveGenres } from './genreQuery/saveGeners';
import headerSlice from './header/headerSice';
import { filmsApi } from './filmsQuery/api';
import { genreApi } from './genreQuery/api';
import userSlice from './auth/userSlice';
import Auth from './auth/api';

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [filmApiGetById.reducerPath]: filmApiGetById.reducer,
    [saveGenres.name]: saveGenres.reducer,
    [Auth.reducerPath]: Auth.reducer,
    [userSlice.name]: userSlice.reducer,
    [headerSlice.name]: headerSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(filmsApi.middleware)
      .concat(genreApi.middleware)
      .concat(filmApiGetById.middleware)
      .concat(Auth.middleware);
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
