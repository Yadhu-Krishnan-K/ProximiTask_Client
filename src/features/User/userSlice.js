import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userData:null
}

const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
    }
})

export default userSlice.reducer
export const {setUserData} = userSlice.actions