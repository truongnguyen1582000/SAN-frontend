import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
