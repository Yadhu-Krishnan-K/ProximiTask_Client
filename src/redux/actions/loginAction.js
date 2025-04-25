import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../helper/axiosInstance";

export const userLogin = createAsyncThunk(
    "User/login",
    async ({ email, pass }, { rejectWithValue }) => {
      try {
        console.log('inside loginAction')
        const response = await instance.post("/users/login", { email, pass })
        return response.data
      } catch (error) {
        console.log('error from userLogin action = ',error)
        return rejectWithValue(error.response.data);
      }
    }
  );