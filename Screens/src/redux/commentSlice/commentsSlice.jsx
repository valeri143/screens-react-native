import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  allComments: [],
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
    fetchAllComments: (state, action) => {
      state.isLoading = false;
      state.allComments = action.payload;
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
  fetchAllComments,
} = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
