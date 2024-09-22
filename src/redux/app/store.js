import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from '../features/User/userSlice'
import workerReducer from '../features/Worker/workerSlice'
import adminReducer from '../features/Admin/adminSlice'

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)


const store = configureStore({
    reducer:{
        userReducer:userReducer,
        workerReducer:workerReducer,
        adminReducer:adminReducer
    }
})

export default store