import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../store/connectionSlice";
import { Link } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";

// Avatar fallback if no image exists:
const AVATAR_PLACEHOLDER =
  "https://ui-avatars.com/api/?background=364152&color=fff&name=User";

function AboutText({ text = "", maxLines = 3 }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return <span className="italic text-gray-500">No about provided.</span>;
  // Count lines by splitting on newlines/taking long ones
  const lines = text.split("\n");
  const isTruncated = !expanded && lines.length > maxLines;

  return (
    <div className="whitespace-pre-line break-words text-sm text-gray-400 max-w-full">
      {isTruncated ? (
        <>
          {lines.slice(0, maxLines).join("\n")}
          {"... "}
          <button
            aria-label="Show more"
            className="text-blue-400 font-medium hover:underline ml-1"
            onClick={() => setExpanded(true)}
          >
            Show more
          </button>
        </>
      ) : (
        <>{text}</>
      )}
    </div>
  );
}

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || "/api"}/user/connections`,
        {
          withCredentials: true,
        }
      );
      dispatch(addconnection(response?.data?.Connections));
    } catch (err) {
      console.log("Error fetching connections", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-200">
          Your Connections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-blue-200">No connections found</h1>
      </div>
    );

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-200 tracking-tight select-none">
        <span className="relative after:block after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-slate-600 after:to-blue-700 after:rounded-full after:bottom-0 after:left-0 after:opacity-30">
          Your Connections
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((connection, idx) => (
          <div
            key={connection._id}
            className="flex flex-col bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-blue-900/70
              border border-blue-900 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300
              backdrop-blur-lg animate-card-in relative overflow-hidden group"
            style={{ animationDelay: `${idx * 0.04}s` }}
          >
            {/* Content */}
            <div className="flex-grow flex flex-col">
              <div className="flex items-center gap-4 mt-4 mx-4">
                <div className="relative">
                  <img
                    src={connection.photoURL || AVATAR_PLACEHOLDER}
                    alt={`${connection.firstName} ${connection.lastName}`}
                    className="w-16 h-16 rounded-full border-2 border-blue-800 shadow-lg ring-2 ring-slate-800 object-cover transition-transform duration-300 group-hover:scale-105 animate-avatar-fade"
                  />
                  {/* Small online indicator: (edit logic as needed) */}
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400 border-2 border-gray-900 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-100 font-mono truncate w-44">
                    {connection.firstName} {connection.lastName}
                  </h3>
                  <div className="text-xs text-blue-300 font-mono">
                    {connection.gender} {connection.age && `| Age: ${connection.age}`}
                  </div>
                </div>
              </div>
              <div className="px-6 mt-4">
                <span className="text-sm font-semibold text-blue-400">Skills</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {connection.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-900/80 text-blue-200 px-3 py-1 rounded-full text-xs font-mono tracking-wide leading-tight border border-blue-800
                        hover:bg-blue-700 transition-colors duration-150 animate-chip-in"
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                  {!connection.skills?.length && (
                    <span className="italic text-gray-500 text-xs">No skills listed</span>
                  )}
                </div>
              </div>
              <div className="px-6 my-4">
                <span className="text-sm font-semibold text-blue-400 mb-1 block">About</span>
                <AboutText text={connection.about} />
              </div>
            </div>
            {/* Chat Button */}
            <div className="px-6 pb-5 pt-2 flex justify-center">
              <Link
                to={`/chat/${connection._id}`}
                className="inline-block w-full py-2 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-400 
                  text-white text-center font-bold font-mono transition-all duration-200 shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-300 animate-pop-in"
              >
                <svg className="inline-block w-5 h-5 mr-2 -mt-1 text-white animate-bounce-x" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M17.5 12.5v-7A1.5 1.5 0 0 0 16 4H4A1.5 1.5 0 0 0 2.5 5.5v7A1.5 1.5 0 0 0 4 14h.333L5 17l4-3h7a1.5 1.5 0 0 0 1.5-1.5z"
                  />
                </svg>
                Chat
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Animations: */}
      <style>
        {`
        @keyframes card-in { 0% { opacity: 0; transform: scale(0.92) translateY(38px);}
                             100% { opacity: 1; transform: none;} }
        .animate-card-in { animation: card-in 0.58s cubic-bezier(.34,1.56,.64,1) both;}
        @keyframes chip-in { from { opacity: 0; transform: scale(0.8);} to { opacity: 1; transform: scale(1); } }
        .animate-chip-in { animation: chip-in 0.19s cubic-bezier(.55,1.26,.58,.99) both;}
        @keyframes pop-in { 0%{opacity:0; transform:scale(0.8);} 80%{transform:scale(1.07);} 100%{opacity:1;transform:scale(1);} }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(.22,1,.36,1.23) both;}
        @keyframes bounce-x { 0%, 100% { transform: translateX(0);} 50% {transform: translateX(-6px);} }
        .animate-bounce-x { animation: bounce-x 0.9s infinite cubic-bezier(.51,.2,.41,1);}
        @keyframes avatar-fade { from{opacity:0;filter:blur(8px);} to{opacity:1;filter:none;} }
        .animate-avatar-fade { animation: avatar-fade 0.9s cubic-bezier(.22,1,.36,1.15) both;}
        `}
      </style>
    </div>
  );
};

export default Connections;
