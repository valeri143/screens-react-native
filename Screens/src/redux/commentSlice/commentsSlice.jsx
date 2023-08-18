import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  isLoading: false,
  isError: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
      state.isLoading = true;
      state.isError = null;
    },
    fetchCommentsSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    fetchCommentsFailure: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    clearCommentsLogOut: (state) => {
      state.comments = [];
      state.isLoading = false;
      state.isError = null;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  clearCommentsLogOut,
} = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
