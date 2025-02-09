import { createSlice } from '@reduxjs/toolkit'


export const connectionSlice = createSlice({
  name: 'connection',
  initialState:null,
  reducers: {
    addconnection:(state,action)=>action.payload,
  },
})

export const { addconnection,removeconnection } = connectionSlice.actions;

export default connectionSlice.reducer;