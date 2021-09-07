const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    logInSuccess(state, action) {
      console.log({ state, action });
      state.token = action.payload;
    },
    logOut(state, action) {
      console.log({ state, action });
      state.token = "";
    },
  },
});

const { reducer, actions } = authSlice;
export const { logInSuccess, logOut } = actions;
export default reducer;
