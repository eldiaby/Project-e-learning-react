import { createSlice } from "@reduxjs/toolkit";

 
const loadWishlistFromLocalStorage = () => {
  try {
    const myWishList = localStorage.getItem("wishlist");
    if (myWishList === null) {
      return [];  
    }
    return JSON.parse(myWishList);
  } catch (e) {
    console.error("Could not load wishlist from localStorage", e);
    return [];
  }
};
 
const saveWishlistToLocalStorage = (wishlist) => {
  try {
    const myWishList = JSON.stringify(wishlist);
    localStorage.setItem("wishlist", myWishList);
  } catch (e) {
    console.error("Could not save wishlist to localStorage", e);
  }
};

const INITIAL_STATE = { 
    wishlistProducts: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: INITIAL_STATE,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const existingItem = state.wishlistProducts.find(item => item.id === product.id);

            if (!existingItem) {
                state.wishlistProducts.push(product);
                saveWishlistToLocalStorage(state.wishlistProducts);
            } 
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlistProducts = state.wishlistProducts.filter(item => item.id !== productId); 
            saveWishlistToLocalStorage(state.wishlistProducts);
        }
    }
});

export default wishlistSlice.reducer;

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
