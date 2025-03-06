import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

export default function EditProfile({user}) {
  
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoURL, setphotoURL] = useState(user?.photoURL);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL||"/api"}/profile/edit`,
        { firstName, lastName, photoURL, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user))
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl p-5">
          <h2 className="text-lg font-semibold text-white text-center mb-4">
            Edit Profile
          </h2>
          <label className="block mb-2">First Name:</label>
          <input
            type="text"
            value={firstName}
            className="input input-bordered w-full mb-2"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="block mb-2">Last Name:</label>
          <input
            type="text"
            value={lastName}
            className="input input-bordered w-full mb-2"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="block mb-2">Photo URL:</label>
          <input
            type="text"
            value={photoURL}
            className="input input-bordered w-full mb-2"
            onChange={(e) => setphotoURL(e.target.value)}
          />
          <label className="block mb-2">Age:</label>
          <input
            type="text"
            value={age}
            className="input input-bordered w-full mb-2"
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="block mb-2">Gender:</label>
          <input
            type="text"
            value={gender}
            className="input input-bordered w-full mb-2"
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="block mb-2">About:</label>
          <input
            type="text"
            value={about}
            className="input input-bordered w-full mb-2"
            onChange={(e) => setAbout(e.target.value)}
          />
          <label className="block mb-2">Skills:</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                <button
                  className="ml-2 text-red-300 hover:text-red-500"
                  onClick={() => removeSkill(skill)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              className="input input-bordered w-full"
              placeholder="Add a skill"
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addSkill}>
              Add
            </button>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      {/* Profile Card */}
      <div className="w-[30vw] p-6 text-white shadow-lg rounded-2xl border border-gray-200 h-[50vh] bg-base-300">
        <div className="flex flex-col items-center bg-base-300">
          <img
            src={photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-300"
          />
          <h2 className="text-xl font-semibold text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-white text-sm">
            Age: {age} | Gender: {gender}
          </p>
          <p className="mt-2 text-white text-sm text-center">{about}</p>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-semibold text-white">Skills:</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {Array.isArray(skills) && skills?.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No skills added</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
