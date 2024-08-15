import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'
import workerReducer from '../features/Worker/workerSlice'

const store = configureStore({
    reducer:{
        userReducer:userReducer,
        workerReducer:workerReducer
    }
})

export default store