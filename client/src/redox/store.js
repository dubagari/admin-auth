import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReduceer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReduceer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistorReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistorReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
