import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accessToken:null,
    roles:[]
}

const authSlice = createSlice({
    initialState,
    name:'Auth',
    reducers:{
        setAccessToken:(state, action)=>{
            state.accessToken = action.payload
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.roles = [];
        },
    }
})

export const { setAccessToken, setRoles, logout } = authSlice.actions;
export default authSlice.reducer;