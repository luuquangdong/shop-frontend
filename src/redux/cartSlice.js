const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      const removeIndex = action.payload;
      state.items = [
        ...state.items.slice(0, removeIndex),
        ...state.items.slice(removeIndex + 1),
      ];
    },
    changeAmount(state, action) {
      const { index, value } = action.payload;
      state.items[index].amount = value;
    },
    clearCart(state, action) {
      state.items = [];
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeFromCart, changeAmount, clearCart } = actions;
export default reducer;
