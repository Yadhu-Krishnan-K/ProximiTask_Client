import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workerData:null
}

const workerSlice = createSlice(
    {
        name:"Worker",
        initialState,
        reducers:{
            setWorkerData:(state,action)=>{
                state.workerData = action.payload
            }
        }
    }
)

export default workerSlice.reducer
export const {setWorkerData} = workerSlice.actions