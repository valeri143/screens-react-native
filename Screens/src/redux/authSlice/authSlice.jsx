import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: null, login: null },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user.email = action.payload.email;
      state.isLoggedIn = true;
    },
    registerSuccess: (state, action) => {
      state.user.email = action.payload.email;
      state.user.login = action.payload.login;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = { email: null, login: null };
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
