import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
    },
    reducers: {
      addToCart: (state, action) => {
        state.items.push(action.payload);
      },
      resetCart: (state) => {
        state.items = [];
      },
    },
  });
  
  export const { addToCart, resetCart } = cartSlice.actions;
  export const selectCartItems = (state) => state.cart.items;
  
  export default cartSlice.reducer;