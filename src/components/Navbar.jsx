import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Profile dropdown state
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
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
  }, [user]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL|| "/api"}/auth/logout`;
      const response = await axios.post(url, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Error occurred");
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md relative">
      {/* Menu Button (For Mobile) */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-400">DevHub</h1>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:relative md:flex md:w-auto md:bg-transparent md:h-auto md:shadow-none md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
          <Link
            to="/connections"
            className="block text-white py-2 px-4 hover:bg-gray-700 rounded md:inline-block md:hover:text-blue-400 transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Connections
          </Link>
          <Link
            to="/requests"
            className="block text-white py-2 px-4 hover:bg-gray-700 rounded md:inline-block md:hover:text-blue-400 transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Requests
          </Link>
          <Link
            to="/"
            className="block text-white py-2 px-4 hover:bg-gray-700 rounded md:inline-block md:hover:text-blue-400 transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Feed
          </Link>
        </div>
      </div>

      {/* Profile Dropdown */}
      {user ? (
        <div className="relative" ref={profileRef}>
          <div className="flex justify-center gap-2 items-center">
            <p className="text-lg text-gray-300 hidden md:block">
              Welcome, {user.firstName}
            </p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400 hover:border-blue-500 transition-colors duration-300"
              />
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden">
              <Link
                to="/profile"
                className="block px-4 py-3 hover:bg-gray-700 transition-colors duration-300"
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="text-white hover:text-blue-400 transition-colors duration-300"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;