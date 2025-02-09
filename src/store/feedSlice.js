import { createSlice } from '@reduxjs/toolkit'


export const feedSlice = createSlice({
  name: 'feed',
  initialState:null,
  reducers: {
    addFeed:(state,action)=>{
       return action.payload
    },
    removeFeed:(state,actions)=>{
        const newFeed=state.filter((feed)=>feed._id!==actions.payload);
        return newFeed;
    }
  },
})

export const { addFeed,removeFeed } = feedSlice.actions;

export default feedSlice.reducer;