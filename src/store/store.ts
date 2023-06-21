import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './slices/nodeSlice';
import { Middleware } from 'redux';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  localStorage.setItem(
    'reduxState',
    JSON.stringify(store.getState().nodesState),
  );

  return result;
};

export const store = configureStore({
  reducer: {
    nodesState: nodesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
