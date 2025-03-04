import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development', // Enable DevTools only in development
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
