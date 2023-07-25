import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload.post);
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { addPost, fetchPostsSuccess } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
