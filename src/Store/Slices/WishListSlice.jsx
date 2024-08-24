import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { 
    wishlistProducts: [],
 
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
            } 
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlistProducts = state.wishlistProducts.filter(item => item.id !== productId); 
        }
    }
});

export default wishlistSlice.reducer;

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
