// src/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../dto/product.interface";

interface State {
  items: Product[];
}

const initialState: State = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
