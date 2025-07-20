import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup((s) => !s);
    setError(""); // Clear errors when switching forms
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isSignup
        ? `${import.meta.env.VITE_BASE_URL || "/api"}/auth/signup`
        : `${import.meta.env.VITE_BASE_URL || "/api"}/auth/login`;

      const response = await axios.post(url, formData, { withCredentials: true });

      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 px-2 py-8">
      <div className="
        w-full max-w-md 
        bg-slate-900/90 
        p-8 
        rounded-2xl 
        border border-blue-900 shadow-2xl
        animate-fade-in-slow
        backdrop-blur
      ">
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-center text-blue-400 mb-6 tracking-tight select-none transition-all">
          {isSignup ? "Create Developer Account" : "Welcome Back, Developer"}
        </h2>
        {error && (
          <div className="mb-4 bg-red-900/80 text-red-200 px-4 py-2 rounded font-semibold text-center animate-pop-in">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
  <div className="flex flex-col md:flex-row gap-2">
    <div className="flex-1 min-w-0 flex flex-col">
      <label className="block mb-1 text-xs text-blue-200 font-mono">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full p-2 rounded-lg border border-blue-900 bg-slate-800/60 text-blue-100 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
        placeholder="Ada"
        required
      />
    </div>
    <div className="flex-1 min-w-0 flex flex-col">
      <label className="block mb-1 text-xs text-blue-200 font-mono">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full p-2 rounded-lg border border-blue-900 bg-slate-800/60 text-blue-100 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
        placeholder="Lovelace"
        required
      />
    </div>
  </div>
)}

          <div>
            <label className="block mb-1 text-xs text-blue-200 font-mono">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-blue-900 bg-slate-800/60 text-blue-200 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs text-blue-200 font-mono">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-blue-900 bg-slate-800/60 text-blue-200 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="●●●●●●"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-bold font-mono text-lg transition shadow-lg focus:outline-none focus:ring-2 ${
              loading
                ? "bg-blue-900 text-blue-200 opacity-80"
                : "bg-blue-600 hover:bg-blue-400 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-blue-200/80 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-400 hover:text-blue-200 font-bold hover:underline transition-all outline-none"
            type="button"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
      <style>{`
        @keyframes fade-in-slow { 
          0% { opacity: 0; transform: translateY(40px) scale(0.95);}
          100% { opacity: 1; transform: none;}
        }
        .animate-fade-in-slow { animation: fade-in-slow .8s cubic-bezier(.32,1.52,.62,1) both;}
        @keyframes pop-in { 
          0%{opacity:0;transform:scale(0.88);}
          90%{transform:scale(1.07);}
          100%{opacity:1;transform:scale(1);}
        }
        .animate-pop-in { animation: pop-in .45s cubic-bezier(.2,1,.35,1.15) both;}
      `}</style>
    </div>
  );
};

export default Login;
