import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL|| "/api"}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(response.data.requests));
    } catch (err) {
      console.log("Error fetching requests:", err.message);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (response, id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/review/${response}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log("Error sending response:", err.message);
    }
  };

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="bg-base-300 p-4 rounded-xl shadow-md">
      {/* Skeleton for profile image */}
      <div className="w-24 h-24 rounded-full mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

      {/* Skeleton for name */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mt-4 w-3/4 mx-auto animate-pulse"></div>

      {/* Skeleton for gender and age */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-1/2 mx-auto animate-pulse"></div>

      {/* Skeleton for about section */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-full mx-auto animate-pulse"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-3/4 mx-auto animate-pulse"></div>

      {/* Skeleton for skills */}
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
      </div>

      {/* Skeleton for buttons */}
      <div className="flex justify-between mt-4">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-24 animate-pulse"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 bg-base-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Connection Requests</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Show 3 skeleton loaders while loading */}
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Connection Requests</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests?.map((request) => (
          <div key={request._id} className="bg-base-300 p-4 rounded-xl shadow-md">
            <img
              src={request.fromUserId.photoURL}
              alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4 text-center">
              {request.fromUserId.firstName} {request.fromUserId.lastName}
            </h2>
            <p className="text-gray-600 text-center">
              {request.fromUserId.gender}, {request.fromUserId.age} years old
            </p>
            <p className="text-gray-500 mt-2 text-sm text-center">
              {request.fromUserId.about}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {request.fromUserId.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleRequest("accepted", request._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
              >
                <FaCheck /> Accept
              </button>
              <button
                onClick={() => handleRequest("rejected", request._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;