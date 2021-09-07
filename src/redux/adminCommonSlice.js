const { createSlice } = require("@reduxjs/toolkit");

const adminCommonSlice = createSlice({
  name: "adminCommon",
  initialState: {
    header: "Dashboard",
  },
  reducers: {
    changeHeader(state, action) {
      state.header = action.payload;
    },
  },
});

const { reducer, actions } = adminCommonSlice;
export const { changeHeader } = actions;
export default reducer;
