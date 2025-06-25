import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/slice';
import todoReducer from './todos/slice';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'isLoggedIn'],
};

const todoPersistConfig = {
  key: 'todo',
  storage,
  whitelist: ['todos'], // тільки масив todo
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedTodosReducer = persistReducer(todoPersistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    todo: persistedTodosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
