import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './feature/item/itemSlice'
import cartReducer from './feature/cart/cartSlice'

 const store = configureStore({
    reducer:{
        item:itemReducer,
        cart:cartReducer
    }
})

export default store;