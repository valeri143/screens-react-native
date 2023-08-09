import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  login: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.isLoggedIn = true;
    },
    registerSuccess: (state, action) => {
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.login = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
