import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice'
import authReducer from '../features/authSlice';

// (
// function working(){

//     console.log('userReducer= ',userReducer)

// })()
export const store = configureStore({
    reducer: {
        User: userReducer,
        // Worker: workerReducer,
        // Admin: adminReducer,
        Auth: authReducer
    }
});