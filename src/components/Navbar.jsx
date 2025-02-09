import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {removeUser} from "../store/userSlice.js"
import {useDispatch,useSelector} from 'react-redux'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  console.log(user);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout=async()=>{
    try{
    const url=`${import.meta.env.VITE_BASE_URL}/auth/logout`;
    const response=await axios.post(url,{},{withCredentials:true})
    console.log(response?.data?.msg)
    dispatch(removeUser());
    }
    catch(err){
      console.log("Error occurred")
    }
  }
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md relative">
      {/* Menu Button (For Mobile) */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold">DevHub</h1>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:relative md:flex md:w-auto md:bg-transparent md:h-auto md:shadow-none ${
          menuOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
          <Link
            to="/connections"
            className="block text-white py-2 px-4 hover:bg-gray-700 rounded md:inline-block md:hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Connections
          </Link>
          <Link
            to="/requests"
            className="block text-white py-2 px-4 hover:bg-gray-700 rounded md:inline-block md:hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Requests
          </Link>
          <Link
            to="/feed"
            className="block text-white py-2 px-4 hover:bg-gray-700 rounded md:inline-block md:hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Feed
          </Link>
        </div>
      </div>

      {/* Profile Dropdown */}
      {user?
      <div className="relative" ref={profileRef}>
        <div className="flex justify-center gap-1 items-center">
        <p className="text-xl mr-2">welcome {user.firstName}</p>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            src={user.profileURL}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
          />
        </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-black text-white shadow-lg rounded-lg">
            <Link to="/profile" className="block px-4 py-2 bg-gray-900 hover:bg-gray-700">
              Profile
            </Link>
            <button className="block w-full text-left px-4 py-2 bg-gray-900 hover:bg-gray-700" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>:
      <>
        <Link to="/login">Login</Link>
      </>
      }

    </nav>
  );
};

export default Navbar;
