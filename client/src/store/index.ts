import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

/* TYPES */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;