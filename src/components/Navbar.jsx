import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Profile dropdown state
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL || "/api"}/auth/logout`;
      await axios.post(url, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // You can show a toast/error here
    }
  };

  const menuItems = [
    { label: "Feed", to: "/" },
    { label: "Connections", to: "/connections" },
    { label: "Requests", to: "/requests" },
  ];

  return (
    <nav className="
      sticky top-0 z-50
      bg-slate-900/80 backdrop-blur
      text-white px-4 py-3
      flex items-center justify-between
      shadow-lg border-b border-blue-900/40
      animate-navbar-fadein
      ">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-2 py-1"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={menuOpen}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Brand */}
      <Link to="/" className="text-2xl font-mono font-bold text-blue-400 select-none tracking-wide drop-shadow-sm">
        DevHub
      </Link>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm block md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Menu List */}
      <div
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-slate-900/95 shadow-lg border-r border-blue-900/40
          flex flex-col gap-3 pt-24 px-6 transform transition-transform duration-300 ease-in-out md:relative md:top-0 md:left-0 md:w-auto md:flex-row md:items-center md:justify-center md:bg-transparent md:backdrop-blur-none md:shadow-none md:pt-0 md:p-0
          ${menuOpen ? "translate-x-0" : "-translate-x-72 md:translate-x-0"}
        `}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`block md:inline-block font-mono px-4 py-2 rounded text-base transition-colors
              ${
                location.pathname === item.to
                  ? "bg-blue-800 text-blue-100 md:bg-transparent md:text-blue-400 font-bold"
                  : "text-white hover:bg-blue-950/50 hover:text-blue-400 md:hover:bg-transparent"
              }`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Profile / Auth */}
      {user ? (
        <div className="relative flex-shrink-0" ref={profileRef}>
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-base font-mono hidden sm:inline">Welcome, {user.firstName}</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition"
              aria-expanded={isOpen}
            >
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-400 hover:border-blue-500 transition-all duration-200 shadow object-cover"
              />
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 min-w-[180px] bg-slate-900 border border-blue-900/50 text-white shadow-lg rounded-xl overflow-hidden z-50 animate-dropdown-fadein">
              <Link
                to="/profile"
                className="block px-5 py-3 hover:bg-blue-950/50 text-left transition-colors font-mono"
              >
                Profile
              </Link>
              <button
                className="block w-full px-5 py-3 hover:bg-blue-950/50 text-left transition-colors font-mono"
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
          className="text-white hover:text-blue-400 font-mono font-bold px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          Login
        </Link>
      )}
      {/* Animations */}
      <style>
        {`
          @keyframes navbar-fadein { 0%{opacity:0;top:-30px} 100%{opacity:1;top:0} }
          .animate-navbar-fadein { animation: navbar-fadein 0.7s cubic-bezier(.29,1.16,.74,1) both; }
          @keyframes dropdown-fadein { from{opacity:0;transform:translateY(-7px);} to{opacity:1;transform: none;} }
          .animate-dropdown-fadein { animation: dropdown-fadein .23s cubic-bezier(.16,1.11,.7,1.13) both;}
        `}
      </style>
    </nav>
  );
};

export default Navbar;
