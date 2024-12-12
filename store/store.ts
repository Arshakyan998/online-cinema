import { configureStore } from "@reduxjs/toolkit";

import { filmsApi } from "./filmsQuery/api";
import { genreApi } from "./genreQuery/api";
import { filmApiGetById } from "./filmBySymbolQuery/api";
import { saveGenres } from "./genreQuery/saveGeners";

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [filmApiGetById.reducerPath]: filmApiGetById.reducer,
    [saveGenres.name]: saveGenres.reducer,
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
