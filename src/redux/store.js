import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import registerReducer from './registerSlice';
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    register: registerReducer,
    auth:authReducer,
  },
});

export default store;
