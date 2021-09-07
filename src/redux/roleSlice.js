const { createSlice } = require("@reduxjs/toolkit");

const roleSlice = createSlice({
  name: "role",
  initialState: {
    role: "",
  },
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

const { reducer, actions } = roleSlice;
export const { setRole } = actions;
export default reducer;
