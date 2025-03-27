import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../actions/loginAction";

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
  extraReducers:(builder)=>{
    builder
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
export const { setUserData, deleteUserData, updateUserData } = userSlice.actions;
