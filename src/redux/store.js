import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminCommonReducer from "./adminCommonSlice";
import cartReducer from "./cartSlice";
import roleReducer from "./roleSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  adminCommon: adminCommonReducer,
  cart: cartReducer,
  role: roleReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
