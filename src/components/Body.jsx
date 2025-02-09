import React,{useEffect} from 'react'
import Footer from './Footer'
import { Outlet,useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {addUser} from "../store/userSlice.js"
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const url=import.meta.env.VITE_BASE_URL
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(url + "/profile/view", {
        withCredentials: true,
      });
      console.log("resonse data:",res.data);
      dispatch(addUser(res?.data?.user));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar />
      <Outlet />

      <Footer />
    </div>  
  )
}

export default Body;
