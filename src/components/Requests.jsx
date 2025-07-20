import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

// Fallback developer avatar
const AVATAR_PLACEHOLDER =
  "https://ui-avatars.com/api/?background=364152&color=fff&name=User";

// About section show more/less, handles long text & whitespace
const AboutText = ({ text = "", maxLines = 3 }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return <span className="italic text-gray-500">No about info.</span>;
  const lines = text.split("\n");
  const isTruncated = !expanded && lines.length > maxLines;
  return (
    <div className="whitespace-pre-line break-words text-sm text-gray-400">
      {isTruncated
        ? lines.slice(0, maxLines).join("\n") + "..."
        : text}
      {isTruncated && (
        <button
          aria-label="Show more"
          className="ml-1 text-blue-400 font-mono hover:underline"
          onClick={() => setExpanded(true)}
        >
          Show more
        </button>
      )}
      {!isTruncated && expanded && lines.length > maxLines && (
        <button
          aria-label="Show less"
          className="ml-1 text-blue-400 font-mono hover:underline"
          onClick={() => setExpanded(false)}
        >
          Show less
        </button>
      )}
    </div>
  );
};

// Animated skeleton loader for dev cards
const SkeletonLoader = () => (
  <div className="bg-slate-900/80 border border-slate-800 rounded-xl shadow animate-card-in p-5 flex flex-col items-center">
    <div className="w-24 h-24 rounded-full bg-slate-800 animate-pulse mb-4" />
    <div className="w-2/3 h-6 bg-slate-800 rounded mb-3 animate-pulse" />
    <div className="w-1/3 h-4 bg-slate-800 rounded mb-2 animate-pulse" />
    <div className="w-full h-3 bg-slate-800 rounded mb-1 animate-pulse" />
    <div className="w-4/5 h-3 bg-slate-800 rounded mb-4 animate-pulse" />
    <div className="flex gap-2 mt-2 mb-4 w-full justify-center">
      <div className="h-6 w-16 rounded-full bg-slate-800 animate-pulse"></div>
      <div className="h-6 w-20 rounded-full bg-slate-800 animate-pulse"></div>
      <div className="h-6 w-24 rounded-full bg-slate-800 animate-pulse"></div>
    </div>
    <div className="flex w-full gap-2 mt-2">
      <div className="flex-1 h-10 rounded-lg bg-slate-800 animate-pulse"></div>
      <div className="flex-1 h-10 rounded-lg bg-slate-800 animate-pulse"></div>
    </div>
  </div>
);

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || "/api"}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(response.data.requests));
    } catch (err) {
      console.log("Error fetching requests:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  const handleRequest = async (response, id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/review/${response}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log("Error sending response:", err.message);
    }
  };

  // ----- UI -----
  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950 min-h-screen">
        <h1 className="text-3xl font-mono font-bold text-center mb-10 text-blue-200 tracking-tight">
          Connection Requests
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950 min-h-screen">
      <h1 className="text-3xl font-mono font-bold text-center mb-10 text-blue-200 tracking-tight">
        Connection Requests
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.length === 0 ? (
          <div className="col-span-full flex flex-col items-center text-lg text-blue-100 font-mono opacity-50 mt-16">
            <span>No incoming connection requests.</span>
          </div>
        ) : (
          requests.map((request, idx) => (
            <div
              key={request._id}
              className="bg-slate-900/80 border border-blue-900 rounded-xl shadow-2xl animate-card-in p-6 flex flex-col items-center
                transition-transform duration-300 hover:scale-[1.02] hover:shadow-blue-900/70 group relative"
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              <div className="relative">
                <img
                  src={request.fromUserId?.photoURL || AVATAR_PLACEHOLDER}
                  alt={`${request.fromUserId?.firstName || ""} ${request.fromUserId?.lastName || ""}`}
                  className="w-24 h-24 rounded-full border-2 border-blue-800 ring-2 ring-indigo-900 mb-2 object-cover animate-avatar-fade group-hover:ring-blue-700 transition"
                />
              </div>
              <h2 className="text-xl font-semibold text-center text-blue-100 mt-3 font-mono truncate w-44">{request.fromUserId?.firstName} {request.fromUserId?.lastName}</h2>
              <div className="text-xs text-blue-300 font-mono">{request.fromUserId?.gender} {request.fromUserId?.age && `| Age: ${request.fromUserId.age}`}</div>
              <div className="w-full mt-2 mb-2 text-center">
                <AboutText text={request.fromUserId?.about} />
              </div>
              <div className="flex flex-wrap justify-center gap-2 my-2">
                {request.fromUserId.skills?.length ? (
                  request.fromUserId.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-900/70 text-blue-200 px-3 py-1 rounded-full text-xs font-mono tracking-wide border border-blue-700 animate-chip-in"
                      style={{ animationDelay: `${i * 0.02}s` }}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="italic text-gray-500 text-xs">No skills listed</span>
                )}
              </div>
              <div className="flex w-full gap-3 mt-5 justify-center">
                <button
                  onClick={() => handleRequest("accepted", request._id)}
                  className="flex-1 py-2 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 shadow
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 animate-pop-in"
                >
                  <FaCheck className="inline" />
                  Accept
                </button>
                <button
                  onClick={() => handleRequest("rejected", request._id)}
                  className="flex-1 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold flex items-center justify-center gap-2 shadow
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 animate-pop-in"
                >
                  <FaTimes className="inline" />
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <style>
        {`
        @keyframes card-in { 0% { opacity: 0; transform: scale(0.93) translateY(34px);}
                             100% { opacity: 1; transform: none;} }
        .animate-card-in { animation: card-in 0.66s cubic-bezier(.34,1.5,.44,1.13) both;}
        @keyframes chip-in { from { opacity: 0; transform: scale(0.7);} to { opacity: 1; transform: scale(1); } }
        .animate-chip-in { animation: chip-in 0.22s cubic-bezier(.54,1.2,.58,.99) both;}
        @keyframes pop-in { 0%{opacity:0; transform:scale(0.85);} 90%{transform:scale(1.1);} 100%{opacity:1;transform:scale(1);} }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(.22,1,.36,1.23) both;}
        @keyframes avatar-fade { from{opacity:0;filter:blur(6px);} to{opacity:1;filter:none;} }
        .animate-avatar-fade { animation: avatar-fade 0.8s cubic-bezier(.22,1,.36,1.15) both;}
        `}
      </style>
    </div>
  );
};

export default Requests;
