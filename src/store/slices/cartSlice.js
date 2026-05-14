import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  taxRate: 0.1, // 10%
  shippingCost: 15.00,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const selectCartSubtotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectCartTax = (state) => selectCartSubtotal(state) * state.cart.taxRate;

export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0) return 0;
  return subtotal + (subtotal * state.cart.taxRate) + state.cart.shippingCost;
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
