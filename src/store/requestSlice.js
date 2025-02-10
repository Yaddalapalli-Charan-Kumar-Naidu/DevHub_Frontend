import { createSlice } from '@reduxjs/toolkit'


export const requestSlice = createSlice({
  name: 'requests',
  initialState:null,
  reducers: {
    addRequests:(state,action)=>{
       return action.payload
    },
    removeRequest:(state,actions)=>{
        const newRequest=state.filter((request)=>request._id!==actions.payload);
        return newRequest;
    }
  },
})

export const { addRequests,removeRequest } = requestSlice.actions;

export default requestSlice.reducer;