import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

if (import.meta.env.VITE_NODE_ENV === "production") {
  var socket = io(import.meta.env.VITE_BASE_URL || "/", {
    path: "/api/socket.io",
  });
} else {
  var socket = io(import.meta.env.VITE_BASE_URL);
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const messagesEndRef = useRef(null); // Ref for the messages container

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
      setLoading(false); // Stop loading after fetching
    }
  };

  // Auto-scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChats();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    // Join the chat room
    socket.emit("joinChat", { userId, targetUserId, firstName: user?.firstName });

    // Listen for incoming messages
    const receiveMessageHandler = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receiveMessage", receiveMessageHandler);

    // Cleanup the listener on unmount
    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [userId, targetUserId, user?.firstName]);

  // Scroll to bottom whenever messages are updated
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
      {/* Skeleton for received message */}
      <div className="flex justify-start">
        <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
        </div>
      </div>

      {/* Skeleton for sent message */}
      <div className="flex justify-end">
        <div className="max-w-[70%] p-3 rounded-lg bg-blue-500 animate-pulse">
          <div className="h-4 bg-blue-400 rounded w-24 mb-2"></div>
          <div className="h-4 bg-blue-400 rounded w-48"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Chat with User
        </h1>
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[70vh]">
          {/* Skeleton Loader for Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>

          {/* Input Area (Disabled while loading) */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex opacity-50">
            <input
              type="text"
              disabled
              className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              disabled
              className="bg-blue-500 text-white p-2 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Chat with {messages[0]?.firstName || "User"}
      </h1>
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[70vh]">
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === userId ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === userId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                <div className="text-sm font-semibold">
                  {msg.sender === userId ? "You" : msg.firstName}
                </div>
                <div className="text-sm mt-1">{msg.message}</div>
              </div>
            </div>
          ))}
          {/* Empty div to act as a scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;