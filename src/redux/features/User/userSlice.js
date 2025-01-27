import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../../helper/axiosInstance";

export const userLogin = createAsyncThunk(
  "User/login",
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const res = await instance.post("/users/login", { email, pass });
      console.log('response from asyncThunk userSlice = ',res)
      
      if (res.data.success) {
        let accessTokens = localStorage.getItem("accessTokens") || [];
        let refreshToken = localStorage.getItem("refreshToken");

        if (accessTokens.length) {
          accessTokens = JSON.parse(accessTokens);
          accessTokens.push(res.data.accessToken);
        } else {
          accessTokens = [res.data.accessToken];
        }

        localStorage.setItem("userData", JSON.stringify(res.data.user));
        console.log('userData saved')
        localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
        if (!refreshToken)
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(res.data.refreshToken)
          );

        return res.data.user;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userData: null,
  loading:false,
  error:null
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    deleteUserData: (state, action) => {
      state.userData = null;
    },
    updateUserData:(state,action) => {
      state.userData = {...state.userData,...action.payload}
    }
  },
  extraReducers:(builer)=>{
    builer
    .addCase(userLogin.pending,(state)=>{
        state.loading = true
        state.error = null
    })
    .addCase(userLogin.fulfilled,(state,action)=>{
        state.loading = false
        state.userData = action.payload
    })
    .addCase(userLogin.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
    })
  }
});

export default userSlice.reducer;
export const { setUserData,deleteUserData } = userSlice.actions;
