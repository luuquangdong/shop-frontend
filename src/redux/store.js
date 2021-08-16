import { configureStore, combineReducers } from '@reduxjs/toolkit'
import exampleReduce from './exampleSlice'
import authReducer from './authSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
  example: exampleReduce,
  auth: authReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store;