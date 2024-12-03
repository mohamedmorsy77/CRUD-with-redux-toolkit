import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  addPost,
  deletePost,
  UpdatePost,
  getPostToView,
} from "../../network/postsApis";
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    loading: false,
    postDetails: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts = [];
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        let index = state.posts.findIndex((post) => post.id === action.payload);
        console.log(index);
        if (index !== -1) {
          state.posts.splice(index, 1);
        }
      })
      .addCase(UpdatePost.fulfilled, (state, action) => {
        console.log(action.payload.data);
        let index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload.data;
        }
      })
      .addCase(getPostToView.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostToView.fulfilled, (state, action) => {
        state.loading = false
        state.postDetails = action.payload;
      });
  },
});
export { fetchPosts, addPost, deletePost, UpdatePost, getPostToView };
export default postsSlice.reducer;
