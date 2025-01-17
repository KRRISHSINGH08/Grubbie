import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../utils/cartSlice'
import locationReducer from '../utils/locationSlice'
const appStore = configureStore({
    reducer: {
        cart : cartReducer, 
        location: locationReducer,

    }
})

export default appStore;