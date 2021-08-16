const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  example: '',
}

const exampleSlice = createSlice({
  name: 'example',
  initialState: initialState,
  reducers: {
    changeText(state, action){
      console.log({state, action})
      state.example = action.payload
    }
  }
})

const { reducer, actions } = exampleSlice

export const { changeText } = actions
export default reducer