import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'
import workerReducer from '../features/Worker/workerSlice'
import adminReducer from '../features/Admin/adminSlice'

const store = configureStore({
    reducer:{
        userReducer:userReducer,
        workerReducer:workerReducer,
        adminReducer:adminReducer
    }
})

export default store