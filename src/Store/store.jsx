import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './Slices/CartSlice';
import wishlistSlice from './Slices/WishListSlice';
import LanguageSlice from "./Slices/LanguageSlice";
  


export default configureStore({
    reducer:{
      cartSlice,wishlistSlice,
      LanguageSlice
    } 
})