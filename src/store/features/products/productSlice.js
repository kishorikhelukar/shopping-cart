import { createSlice } from "@reduxjs/toolkit";
import ProductsThunkAPI from "./middleware";

const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  products: [],
  singleProduct: null,
  cart: [],
  status: STATUSES.IDLE,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.price *= itemInCart.quantity;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          cost: action.payload.price,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity++;
      item.price *= item.quantity;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      item.price = item.cost * item.quantity;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: {
    /**
     * @desc all product list
     * @param {*} state
     * @param {*} action
     */
    [ProductsThunkAPI.getAllProductsAsync.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [ProductsThunkAPI.getAllProductsAsync.fulfilled]: (state, action) => {
      state.products = action?.payload;
      state.status = STATUSES.IDLE;
    },
    [ProductsThunkAPI.getAllProductsAsync.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },

    /**
     * @desc single product details
     * @param {*} state
     * @param {*} action
     */
    [ProductsThunkAPI.getSingleProductAsync.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [ProductsThunkAPI.getSingleProductAsync.fulfilled]: (state, action) => {
      state.singleProduct = action?.payload;
      state.status = STATUSES.IDLE;
    },
    [ProductsThunkAPI.getSingleProductAsync.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
  },
});

export const {
  emptyCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} = productSlice.actions;

export default productSlice.reducer;
