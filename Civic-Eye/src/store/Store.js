import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth"],
};
const rootReducer = combineReducers({
  Auth: AuthSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(Store);

export default Store;
