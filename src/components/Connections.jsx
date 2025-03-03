import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../store/connectionSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Connections = () => {
  const connections = useSelector((store)=>store.connection);
  const dispatch=useDispatch()
  const fetchConnections=async()=>{
    try{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/user/connections`,{
        withCredentials:true
      })
      console.log(response.data)
      dispatch(addconnection(response?.data?.Connections));
    }
    catch(err){
      console.log("Error fetching connections",err.message);
    }
  
  }
  useEffect(()=>{
    fetchConnections();
  },[])
  if(!connections) return;
  if(connections.length===0) return <h1>No connections found</h1>
  return (
    <div className="max-w-screen mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Connections</h2>
      <div className="space-y-4">
        {connections?.length === 0 ? (
          <p className="text-gray-500 text-center">No connections yet.</p>
        ) : (
          <div className="max-w-screen grid grid-cosl-1 md:grid-cols-3 gap-2">
          {connections?.map((connection, index) => (
            <div
              key={connection._id}
              className="flex items-center justify-between bg-base-300 p-4 shadow-md rounded-lg border border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={connection.photoURL}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="w-14 h-14 rounded-full border border-gray-300"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{connection.firstName} {connection.lastName}</h3>
                  <p className="text-sm text-gray-500">Age: {connection.age}</p>
                  <p className="text-sm text-gray-500">Gender: {connection.gender}</p>
                  <p className="text-sm text-gray-500">Skills: {connection.skills}</p>
                  <p className="text-sm text-gray-500">About: {connection.about}</p>
                </div>
                <Link to={`/chat/${connection._id}`} className='btn btn-primary'>chat</Link>
              </div>
              
            </div>
          ))
        }</div>
        )}
        
      </div>

      
    </div>
  );
};

export default Connections;