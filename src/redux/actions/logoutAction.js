import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../helper/axiosInstance";

export const logoutAction = createAsyncThunk(
    'User/logout',
    async (_, { rejectWithValue }) => {
        try {
          const res = await instance.get('/users/logout');
          return res.data; // 👈 Pass the backend message as payload
        } catch (err) {
            console.log('err in logout = ',err)
          return rejectWithValue(err.response?.data?.message || 'Logout failed');
        }
    }
)