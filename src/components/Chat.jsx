import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import axios from 'axios';
const socket = io("http://localhost:6872", { transports: ["websocket"] }); // Persistent socket connection

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const user = useSelector(store => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const fetchChats = async ()=>{
    const response=await axios.get("http://localhost:6872/chat/"+targetUserId,{
      withCredentials:true
    }
    );
    const chatMessages = response?.data?.messages.map((msg) => {
      const { senderId, message } = msg;
      return {
        sender: senderId?._id,
        firstName: senderId?.firstName,
        message
      };
    });
    console.log(chatMessages)
    setMessages(chatMessages);
    // console.log("all messages:"+JSON.stringify(response.data.messages));
    // setMessages(response.data.messages);
  }
  useEffect(()=>{
    fetchChats();
  },[])
  useEffect(() => {
    if (!userId || !targetUserId) return;

    // Join the chat room
    socket.emit("joinChat", { userId, targetUserId, firstName: user?.firstName });

    // Ensure event listener is added only once
    const receiveMessageHandler = (data) => {
      console.log("Received message:", data);

      setMessages(prevMessages => 
         [...prevMessages, data]
      );
    };

    socket.on("receiveMessage", receiveMessageHandler);

    // Cleanup the listener on unmount
    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [userId, targetUserId, user?.firstName]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const messageData = { message: inputValue, firstName:user.firstName,userId, targetUserId };
    console.log("Sending message:", messageData);

    socket.emit("sendMessage", messageData); // Send to server
    // setMessages(prevMessages => [...prevMessages, { sender: userId,firstn:user.firstName, message: inputValue }]); // Optimistically update UI
    setInputValue(''); // Clear input after sending
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Chat</h1>
      <div className="border border-gray-200 rounded-lg h-[70vh] w-[60vw] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages?.map((msg, index) => (
            
            <div className={`chat ${msg.sender == userId ? 'chat-end' : 'chat-left'}`}>
              {console.log("sender:"+msg.sender)}{ console.log("user:"+userId)}
            <div className="chat-header">
              {msg?.sender===userId?user.firstName:msg.firstName}
              {/* <time className="text-xs opacity-50">12:45</time> */}
            </div>
            <div className="chat-bubble">{msg.message}</div>
          </div>
          ))}
        </div>
        <div className="border-t border-gray-200 p-4 flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border border-gray-200 rounded-l"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
