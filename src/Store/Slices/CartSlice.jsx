import { createSlice } from "@reduxjs/toolkit";
 
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cartProducts');
    return storedCart ? JSON.parse(storedCart) : [];
};

 
const INITIAL_STATE = { 
    cartProducts: loadCartFromLocalStorage(),
    cartCount: loadCartFromLocalStorage().length, 
    addStatus: '' 
};

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cartProducts.find(item => item.id === product.id);

            if (!existingItem) {
                state.cartProducts.push(product);
                state.cartCount += 1;  
                state.addStatus = 'Product added to cart!';
            } else {
                state.addStatus = 'Product already in cart!';
            }

          
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        updateCartProductQuantity: (state, action) => {
            const { id, count } = action.payload;
            const product = state.cartProducts.find(item => item.id === id);
            if (product) {
                product.count = count;
            }

      
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartProducts = state.cartProducts.filter(item => item.id !== productId);
            state.cartCount = state.cartProducts.length;  
            state.addStatus = 'Removed successfully';  

        
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        clearAddStatus: (state) => {
            state.addStatus = '';
        }
    }
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, clearAddStatus, updateCartProductQuantity } = cartSlice.actions;
