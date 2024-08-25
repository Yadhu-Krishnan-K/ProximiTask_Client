import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const workerLogin = createAsyncThunk(
//     'Worker/login',
//     async()
// )

const initialState = {
    loading:false,
    workerData:null,
    error:null
}

const workerSlice = createSlice(
    {
        name:"Worker",
        initialState,
        reducers:{
            setWorkerData:(state,action)=>{
                state.workerData = action.payload
            },
            deleteWorkerData:(state)=>{
                state.workerData = null
            }
        },
        // extraReducers:(builder)=>{
        //     builder.addCase()
        // }
    }
)

export default workerSlice.reducer
export const {setWorkerData} = workerSlice.actions