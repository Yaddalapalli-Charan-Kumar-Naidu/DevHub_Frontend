import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL || "/api"}/profile/edit`,
        { firstName, lastName, photoURL, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
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
    <div className="flex flex-col lg:flex-row justify-center items-start my-10 gap-6 p-4">
      {/* Edit Profile Form */}
      <div className="w-full lg:w-1/2 max-w-2xl bg-base-300 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              First Name:
            </label>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Last Name:
            </label>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Photo URL:
            </label>
            <input
              type="text"
              value={photoURL}
              className="input input-bordered w-full"
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Age:
            </label>
            <input
              type="text"
              value={age}
              className="input input-bordered w-full"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Gender:
            </label>
            <input
              type="text"
              value={gender}
              className="input input-bordered w-full"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              About:
            </label>
            <textarea
              value={about}
              className="textarea textarea-bordered w-full"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Skills:
            </label>
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
            <div className="flex items-center gap-2">
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
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Preview Card */}
      <div className="w-full lg:w-1/3 bg-base-300 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
          />
          <h2 className="text-xl font-bold text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Age: {age} | Gender: {gender}
          </p>
          <p className="text-gray-300 text-sm mt-2 text-center">{about}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-300">Skills:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.length > 0 ? (
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