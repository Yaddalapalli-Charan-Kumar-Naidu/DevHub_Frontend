import axios from "axios";
import { removeFeed } from "../store/feedSlice";
import { useDispatch } from "react-redux";

const Card = ({ feed }) => {
  const dispatch = useDispatch();

  const handleResponse = async (response, id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL || "/api"}/request/send/${response}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (err) {
      console.error("Error responding to feed:", err.message);
    }
  };

  return (
    <div className="max-w-sm w-full mx-3 md:mx-0 bg-slate-900/90 rounded-2xl overflow-hidden shadow-2xl border border-blue-900
      p-4 md:p-6 flex flex-col animate-card-in">
      <div className="relative">
        <img
          className="w-full h-40 object-cover rounded-xl border border-slate-800 shadow-lg"
          src={feed?.photoURL}
          alt={`${feed?.firstName ?? ""} ${feed?.lastName ?? ""}`}
        />
        {/* Dev-like floating status dot (dummy) */}
        <span className="absolute bottom-2 right-2 w-4 h-4 bg-blue-500 border-2 border-slate-900 rounded-full shadow" />
      </div>

      <div className="mt-5 mb-2">
        <h2 className="text-2xl text-blue-100 font-bold font-mono">
          {feed?.firstName} {feed?.lastName}
        </h2>
        <span className="block text-blue-300 mt-1 font-mono text-xs">
          {feed?.gender} {feed?.age ? `| Age: ${feed?.age}` : ""}
        </span>
      </div>

      <div className="mb-2 min-h-[56px]">
        <p className="
          text-blue-100 text-sm font-mono whitespace-pre-line max-h-20 overflow-auto break-words px-0.5
          scrollbar-thin scrollbar-thumb-blue-900/70 scrollbar-track-transparent
        ">
          {feed?.about || <span className="italic text-blue-400 opacity-60">No about provided.</span>}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xs font-bold text-blue-300 mb-1 font-mono">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {feed?.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-900/80 text-blue-200 px-3 py-1 rounded-full
              text-xs font-mono tracking-wide border border-blue-700 shadow-md
              animate-chip-in"
              style={{ animationDelay: `${idx * 0.027}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-auto pt-3">
        <button
          className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold font-mono
            focus:outline-none focus:ring-2 focus:ring-green-300 transition-all animate-pop-in"
          onClick={() => handleResponse("interested", feed._id)}
        >
          Interested
        </button>
        <button
          className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold font-mono
            focus:outline-none focus:ring-2 focus:ring-red-300 transition-all animate-pop-in"
          onClick={() => handleResponse("ignored", feed._id)}
        >
          Ignore
        </button>
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes card-in { 0% { opacity: 0; transform: scale(0.93) translateY(36px);}
                               100% { opacity: 1; transform: none; } }
          .animate-card-in { animation: card-in .66s cubic-bezier(.34,1.5,.44,1.05) both;}
          @keyframes chip-in { from { opacity: 0; transform: scale(0.77);} to { opacity: 1; transform: scale(1); } }
          .animate-chip-in { animation: chip-in 0.15s cubic-bezier(.3,1.2,.68,.99) both;}
          @keyframes pop-in { 0% {opacity:0; transform: scale(0.85);} 85%{transform: scale(1.05);} 100%{ opacity:1; transform: scale(1);} }
          .animate-pop-in { animation: pop-in 0.42s cubic-bezier(.22,1,.36,1.23) both;}
        `}
      </style>
    </div>
  );
};

export default Card;
