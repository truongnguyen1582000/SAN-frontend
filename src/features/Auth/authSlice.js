import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem('USER')) || {},
    setting: {},
  },
  reducers: {
    logout: (state, payload) => {
      state.current = {};
      localStorage.removeItem('USER');
      localStorage.removeItem('TOKEN');
    },
    login: (state, payload) => {
      state.current = payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, login } = actions;
export default reducer;
