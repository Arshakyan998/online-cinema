import { configureStore } from "@reduxjs/toolkit";

import { filmsApi } from "./filmsQuery/api";
import { genreApi } from "./genreQuery/api";
import { filmApiGetById } from "./filmByIdQuery/api";

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [filmApiGetById.reducerPath]: filmApiGetById.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(filmsApi.middleware)
      .concat(genreApi.middleware)
      .concat(filmApiGetById.middleware);
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];