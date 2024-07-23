import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'

const store = configureStore({
    reducer:{
        userReducer:userReducer
    }
})

export default store