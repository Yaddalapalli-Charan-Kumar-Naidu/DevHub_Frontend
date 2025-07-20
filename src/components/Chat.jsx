import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

// Socket connection
if (import.meta.env.VITE_BASE_URL) {
  var socket = io(import.meta.env.VITE_BASE_URL);
} else {
  var socket = io(import.meta.env.VITE_BASE_URL || "/", {
    path: "/api/socket.io",
  });
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || "/api"}/chat/${targetUserId}`,
        { withCredentials: true }
      );
      const chatMessages = response?.data?.messages.map((msg) => {
        const { senderId, message } = msg;
        return {
          sender: senderId?._id,
          firstName: senderId?.firstName,
          message,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    socket.emit("joinChat", { userId, targetUserId, firstName: user?.firstName });

    const receiveMessageHandler = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    socket.on("receiveMessage", receiveMessageHandler);
    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [userId, targetUserId, user?.firstName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const messageData = {
      message: inputValue,
      firstName: user.firstName,
      userId,
      targetUserId,
    };
    socket.emit("sendMessage", messageData);
    setInputValue("");
  };

  // Skeleton Loader for Chat Messages
  const SkeletonLoader = () => (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-start">
        <div className="max-w-[75vw] md:max-w-[65%] p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[75vw] md:max-w-[65%] p-3 rounded-2xl bg-blue-500 animate-pulse">
          <div className="h-4 bg-blue-400 rounded w-24 mb-2"></div>
          <div className="h-4 bg-blue-400 rounded w-48"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950">
      {/* Top Bar (Back Button + Chat User) */}
      <div className="w-full max-w-3xl mx-auto px-2 md:px-4 py-3 flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 mt-1 rounded-lg bg-slate-800 text-blue-200 hover:bg-slate-700 font-mono font-semibold 
            transition shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="ml-1 text-lg md:text-xl font-mono font-bold text-blue-100 truncate">
          Chat with {messages[0]?.firstName || "User"}
        </span>
      </div>

      {/* Main Chat Bubble Area */}
      <div className="flex-1 w-full max-w-3xl mx-auto relative">
        <div className="flex flex-col h-[70vh] bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl border border-blue-900 mx-2 md:mx-0">
          {/* Messages */}
          <div className="flex-1 p-3 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900/50">
            {loading ? (
              <>
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </>
            ) : messages && messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === userId ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`relative px-4 py-2 rounded-2xl max-w-[88vw] md:max-w-[66%] break-words shadow-md
                      ${msg.sender === userId
                        ? "bg-blue-600 text-white rounded-br-md animate-chat-bubble-right"
                        : "bg-slate-200 dark:bg-blue-950/80 text-gray-800 dark:text-blue-100 rounded-bl-md animate-chat-bubble-left"
                      }`
                    }
                  >
                    <span className="block text-xs font-bold font-mono mb-1 opacity-70">
                      {msg.sender === userId ? "You" : msg.firstName}
                    </span>
                    <span className="text-base whitespace-pre-wrap">{msg.message}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 font-mono">
                No messages yet.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat Input */}
          <form
            className={`flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-2 md:p-4 flex gap-2 bg-white/95 dark:bg-gray-800/90
              ${loading ? "opacity-50 pointer-events-none" : ""}`}
            onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
            style={{ position: "sticky", bottom: 0, left: 0, right: 0, backdropFilter: "blur(6px)" }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-blue-900 bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-blue-100
                focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm shadow-sm
                placeholder:text-gray-400 dark:placeholder:text-blue-200"
              placeholder="Type a message..."
              disabled={loading}
              autoFocus={!loading}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className={`flex items-center gap-2 px-5 md:px-7 py-2 rounded-lg font-bold font-mono
                text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-800
                shadow transition disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes chat-bubble-left {
          from { opacity: 0; transform: translateX(-20px) scale(.95);}
          to   { opacity: 1; transform: none;}
        }
        .animate-chat-bubble-left { animation: chat-bubble-left .29s cubic-bezier(.37,1.1,.43,1) both; }

        @keyframes chat-bubble-right {
          from { opacity: 0; transform: translateX(20px) scale(.95);}
          to   { opacity: 1; transform: none;}
        }
        .animate-chat-bubble-right { animation: chat-bubble-right .29s cubic-bezier(.42,1.1,.47,1) both; }
      `}</style>
    </div>
  );
}

export default Chat;
