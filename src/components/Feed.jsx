import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../store/feedSlice";
import SkeletonLoader from "./SkeletonLoader";

const Feed = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || '/api'}/user/feed`,
        { withCredentials: true }
      );
      dispatch(addFeed(response?.data?.feed));
    } catch (err) {
      setError(err?.response?.data || "Couldn't fetch feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center my-16 max-w-screen px-3">
        <div className="p-5 bg-red-900/80 text-red-200 font-mono shadow-lg rounded-xl animate-pop-in">
          <span className="text-xl font-bold mb-2 block">Error loading feed</span>
          <span>{String(error)}</span>
        </div>
      </div>
    );
  }

  if (!feeds) return null;

  if (feeds.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-[40vh] justify-center text-blue-100 font-mono animate-fade-in-slow">
        <div className="bg-slate-900/80 rounded-xl border border-blue-950/30 shadow-lg px-10 py-8 my-10">
          <h1 className="text-3xl font-bold mb-2">No new users found</h1>
          <p className="text-gray-400">Check back later for more connections in your developer network.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10 min-h-[60vh] bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950">
      <div className="animate-card-in">
        <Card feed={feeds[0]} />
      </div>
      <style>
        {`
        @keyframes card-in { 0% { opacity: 0; transform: scale(0.93) translateY(36px);}
                             100% { opacity: 1; transform: none; } }
        .animate-card-in { animation: card-in .70s cubic-bezier(.34,1.5,.44,1.05) both;}
        @keyframes fade-in-slow { 0% { opacity: 0; transform: translateY(24px); }
                                  80% { opacity: 1; transform: translateY(-4px);}
                                  100% { opacity: 1; transform: none; } }
        .animate-fade-in-slow { animation: fade-in-slow .9s cubic-bezier(.22,1,.32,1.19) both;}
        @keyframes pop-in { 0% {opacity:0; transform: scale(0.85);} 85%{transform: scale(1.05);} 100%{ opacity:1; transform: scale(1);} }
        .animate-pop-in { animation: pop-in 0.43s cubic-bezier(.22,1,.36,1.23) both;}
        `}
      </style>
    </div>
  );
};

export default Feed;
