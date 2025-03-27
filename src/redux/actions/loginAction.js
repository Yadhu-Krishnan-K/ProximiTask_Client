import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
    "User/login",
    async ({ email, pass }, { rejectWithValue }) => {
      try {
        const response = await instance.post("/users/login", { email, pass })
        return response
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );