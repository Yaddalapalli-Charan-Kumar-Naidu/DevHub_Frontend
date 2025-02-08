import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'user',
  initialState:null,
  reducers: {
    addUser:(state,action)=>action.payload
  },
})

export const { addUser } = counterSlice.actions;

export default counterSlice.reducer;