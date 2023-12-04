import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    itemID: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    updateItemSoldStatus: (state, action) => {
      const { itemId, isSold } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        // Update the item's sold status
        state.cartItems[itemIndex].isSold = isSold;
      }
    },
    updateItemID: (state, action) => {
      state.itemID = action.payload;
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
    deleteItem: (state, action) => {
      const { payload: uniqueIdentifier } = action;

      state.cartItems = state.cartItems.filter(
        (item) => `${item.email}_${item.itemID}` !== uniqueIdentifier
      );
    },
  },
});

export const { addToCart, updateItemSoldStatus, updateItemID, resetCart, deleteItem } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectItemID = (state) => state.cart.itemID;
export default cartSlice.reducer;