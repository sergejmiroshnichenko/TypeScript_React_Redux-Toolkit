import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
  },
});
