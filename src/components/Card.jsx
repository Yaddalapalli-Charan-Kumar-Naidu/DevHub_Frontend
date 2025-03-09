import axios from "axios";
import { removeFeed } from "../store/feedSlice";
import { useDispatch } from "react-redux";


const Card = ({ feed }) => {
  const dispatch=useDispatch()
  const handleResponse=async (response,id)=>{
    try{
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${response}/${id}`,{},{withCredentials:true})
     //console.log(res.data);
      dispatch(removeFeed(id))
    }catch(err){
      console.error("Error responding to feed:",err.message)
    }
  }
  return (
    <div className="max-w-sm mx-3 md:mx-0 rounded-2xl overflow-hidden shadow-lg p-5 bg-base-300 border border-gray-200">
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={feed?.photoURL}
        alt={`${feed?.firstName} ${feed?.lastName}`}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-900">{feed?.firstName} {feed?.lastName}</h2>
        <p className="text-gray-600 text-sm">Age: {feed?.age} | Gender: {feed?.gender}</p>
        <p className="mt-2 text-gray-700 text-sm">{feed?.about}</p>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-800">Skills:</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {feed?.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" onClick={()=>handleResponse("interested",feed._id)}>Interested</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={()=>handleResponse("ignored",feed._id)}>Ignore</button>
      </div>
    </div>
  );
};

export default Card;
