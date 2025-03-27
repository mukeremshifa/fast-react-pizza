import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = pizza item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizza id
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizza id
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizza id
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      //delete item if decreased to 0
      //tick to call reducers inside another reducer
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

//selector functions
export const getTotalCartQuantity = state =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = state =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = state => state.cart.cart;

export const getCurrentQuantity = id => state =>
  state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
