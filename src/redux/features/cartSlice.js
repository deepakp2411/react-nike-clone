import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },

    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    // add to cart
    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(`Item qty increased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.title} added to cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // remove items

    removeItem: (state, action) => {
      const removeItemIndex = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = removeItemIndex;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.success(`${action.payload.title} Removed from cart`);
    },

    increaseQty: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(`Item qty increased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.title} increased qty`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseQty: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.success(`Item qty decreased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.title} decreased cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.success(`cart cleared`);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // cartTotal
    getTotals: (state, action) => {
      let { totalAmount, totalQty } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;

          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQty += cartQuantity;

          return cartTotal;
        },
        { totalAmount: 0, totalQty: 0 }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQty = totalQty
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  addItemToCart,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
  getTotals
} = cartSlice.actions;

export const selectCartState = (state) => state.cart.cartState;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQty = (state) => state.cart.cartTotalQty;

export default cartSlice.reducer;
