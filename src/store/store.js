import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './Slices/cartSlice' 
import wishlistReducer from './Slices/wishlistSlice'
import authReducer from './Slices/authSlice'
import toastReducer from './Slices/toastSlice'


const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    toast: toastReducer
  },
});

export default store;