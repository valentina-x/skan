import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "./rootReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
