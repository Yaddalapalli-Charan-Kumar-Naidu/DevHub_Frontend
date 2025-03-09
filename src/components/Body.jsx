import React, { useEffect,useState } from "react";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../store/userSlice.js";
import Cookies from 'js-cookie'
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const url = import.meta.env.VITE_BASE_URL;
  const [cookie, setCookie] = useState(Cookies.get("token"));
  useEffect(() => {
    const fetchUser = async () => {
      if (userData && Object.keys(userData).length > 0) return;

      try {
        if(cookie){
        const res = await axios.get(`${url}/profile/view`, {
          withCredentials: true,
        });
       //console.log("Response data:", res?.data);
        if (res?.data?.user) {
          dispatch(addUser(res.data.user));
        }
      }
      else{
        navigate("/login")
      }
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [dispatch, navigate, url, userData,cookie]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
