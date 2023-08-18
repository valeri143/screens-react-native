import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  isError: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.isLoading = true;
      state.isError = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    clearPostsLogOut: (state) => {
      state.posts = [];
      state.isLoading = false;
      state.isError = null;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  clearPostsLogOut,
} = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
