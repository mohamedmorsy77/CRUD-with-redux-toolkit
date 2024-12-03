import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// fetch Posts data
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// adding new post
export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    postInfo
  );

  return response.data;
});

// Delete Posts

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

export const UpdatePost = createAsyncThunk(
  "posts/UpdatePost",
  async ({ id, newUpdatePost }) => {
    console.log(newUpdatePost);
    let response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      newUpdatePost
    );

    return { id, data: response.data };
  }
);

// Get The post To PostDetails Views

export const getPostToView = createAsyncThunk("posts/viewPost",async (id) => {
  let response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  
  return response.data;
});
