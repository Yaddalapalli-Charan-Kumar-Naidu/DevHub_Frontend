import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../store/feedSlice";
import SkeletonLoader from "./SkeletonLoader"; // Import the SkeletonLoader

const Feed = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/feed`,
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(response?.data?.feed));
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-5 max-w-screen">
        <SkeletonLoader /> {/* Show skeleton loader while loading */}
      </div>
    );
  }

  if (!feeds) return null;
  if (feeds.length <= 0)
    return (
      <h1 className="flex justify-center text-white font-bold my-10 text-3xl">
        No new users found
      </h1>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex justify-center items-center my-5 max-w-screen">
      <Card feed={feeds[0]} />
    </div>
  );
};

export default Feed;