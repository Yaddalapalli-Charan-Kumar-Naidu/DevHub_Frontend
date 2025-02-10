import React ,{useState,useEffect} from 'react'
import Card from "./Card"
import axios from "axios"
import {useSelector,useDispatch} from 'react-redux';
import { addFeed } from '../store/feedSlice';
const Feed = () => {
  const [error, setError] = useState(null);
  const feeds=useSelector((store)=>store.feed)
  const dispatch=useDispatch()
  const fetchFeed = async () => {
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      console.log(response.data)
      dispatch(addFeed(response?.data?.feed)); 
    } catch (err) {
      setError(err?.response?.data);
    } 
  };

  useEffect(() => {
    fetchFeed();
  }, []); 

  if(!feeds) return
  if(feeds.length<=0) return <h1 className="flex justify-center text-white font-bold my-10 text-3xl">No new users found</h1>
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (

    <div className="flex justify-center items-center my-5 max-w-screen">
       <Card 
        feed={feeds[0]}
      />


    </div>
  )
}

export default Feed
