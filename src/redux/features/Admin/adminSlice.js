import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    adminLogedIn: false,
    error:null
}

const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers:{
        setAdmin:(state)=>{
            state.adminLogedIn = true
        },
        adminLogout:(state)=>{
            state.adminLogedIn = false
        }
    }
})

export default adminSlice.reducer
export const {setAdmin, adminLogout} = adminSlice.actions