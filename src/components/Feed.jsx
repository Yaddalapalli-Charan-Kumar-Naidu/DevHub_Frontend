import React ,{useState,useEffect} from 'react'
import Card from "./Card"
import axios from "axios"
import {useSelector,useDispatch} from 'react-redux';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  
  const fetchFeed = async () => {
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      setFeed(response.data); 
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []); // Runs once when component mounts

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (

    <div className="flex justify-center items-center my-5">
       <Card
        image="https://randomuser.me/api/portraits/women/45.jpg"
        name="Jane Doe"
        age={25}
        gender="Female"
        about="An artist and traveler, passionate about exploring new places and cultures."
      />
    </div>
  )
}

export default Feed
