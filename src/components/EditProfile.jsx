import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

// Techy avatar as fallback for devs
const AVATAR_PLACEHOLDER = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=User";

export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || AVATAR_PLACEHOLDER);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL || "/api"}/profile/edit`,
        { firstName, lastName, photoURL, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
      setTimeout(() => setError(""), 2500);
    }
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 p-6 md:p-12 relative overflow-x-hidden
      bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 animate-fade-in-fast"
    >
      {/* Animated cyber deco */}
      <div className="absolute left-0 top-0 w-56 h-56 bg-gradient-to-br from-blue-700/50 to-transparent opacity-30 rounded-full blur-2xl pointer-events-none animate-float-x" />
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-gradient-to-tr from-slate-800 via-gray-700 to-blue-800 opacity-25 rounded-full blur-2xl pointer-events-none animate-float-y" />

      {/* Profile Edit Form */}
      <section
        className="w-full max-w-xl bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-800/60 p-8 flex flex-col gap-6 z-10 
                  animate-slide-up"
      >
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-blue-400 tracking-tight mb-2 text-center flex items-center gap-2 select-none">
          <svg className="w-6 h-6 text-blue-400 animate-bounce-slow inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" /></svg>
          Edit Your Profile
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-blue-300 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              className="w-full px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition placeholder:text-slate-500"
              placeholder="Ada"
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="block font-semibold text-blue-300 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="w-full px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition placeholder:text-slate-500"
              placeholder="Lovelace"
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold text-blue-300 mb-1">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            className="w-full px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition placeholder:text-slate-500"
            placeholder="Paste image url"
            onChange={(e) => setPhotoURL(e.target.value)}
            autoComplete="photo"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-blue-300 mb-1">Age</label>
            <input
              type="number"
              value={age}
              min={0}
              className="w-full px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition placeholder:text-slate-500"
              placeholder="42"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold text-blue-300 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
    
            </select>
          </div>
        </div>
        <div>
          <label className="block font-semibold text-blue-300 mb-1">About</label>
          <textarea
            value={about}
            className="w-full px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition min-h-[65px] placeholder:text-slate-500 resize-y"
            placeholder="Full stack engineer, open source enthusiast, loves TypeScript and distributed systems..."
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold text-blue-300 mb-1">Skills</label>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[38px]">
            {skills.map((skill, idx) => (
              <span
                key={skill}
                className="inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-700 text-blue-200 px-3 py-1 rounded-full text-xs font-bold font-mono shadow animate-chip-in cursor-pointer transition-transform duration-150 hover:scale-110"
                style={{ animationDelay: `${0.03 * idx}s` }}
              >
                <span className="pr-1">{skill}</span>
                <button
                  type="button"
                  className="ml-1 text-blue-300 hover:text-red-300 transition-colors focus:outline-none"
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                  tabIndex={0}
                >×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              className="flex-1 px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-600 transition placeholder:text-slate-500"
              placeholder="E.g. React, Docker"
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleSkillInputKeyDown}
            />
            <button
              type="button"
              className="px-4 py-2 rounded bg-blue-800 text-blue-100 font-semibold shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95 transition"
              onClick={addSkill}
            >
              Add
            </button>
          </div>
        </div>
        {error && (
          <div className="px-3 py-2 bg-red-900/90 text-red-200 rounded text-center font-medium animate-pop-in">{error}</div>
        )}
        {success && (
          <div className="px-3 py-2 bg-blue-800/90 text-blue-100 rounded text-center font-medium animate-pop-in">{success}</div>
        )}
        <button
          className="mt-3 py-3 rounded-md w-full bg-gradient-to-r from-blue-800 to-blue-700 text-blue-100 font-bold text-lg shadow-lg hover:bg-blue-900 hover:scale-[1.02] active:scale-95 transition"
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </section>

      {/* Preview Card */}
      <aside className="w-full max-w-xs mt-10 lg:mt-0 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-lg border border-blue-950/30 z-10 overflow-hidden flex flex-col items-center py-8 px-6 relative animate-fade-in-slow">
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-950 via-slate-800 to-transparent opacity-10 blur-lg pointer-events-none" />
        <div className="relative z-10">
          {/* Animated Avatar Halo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-tr from-blue-700 to-blue-400 opacity-20 blur-2xl rounded-full pointer-events-none animate-avatar-glow" />
          <img
            src={photoURL || AVATAR_PLACEHOLDER}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full shadow ring-4 ring-slate-800 border-2 border-slate-900 mb-3 mx-auto relative z-20 animate-avatar-fade"
          />
        </div>
        <h2 className="font-bold text-lg text-slate-100 text-center leading-tight">
          {firstName || "Firstname"} <span className="text-blue-400">{lastName || "Lastname"}</span>
        </h2>
        <div className="mt-1 text-xs text-blue-200 tracking-wide space-x-2">
          {age && !(isNaN(age) || age === "0") && <span>Age: {age}</span>}
          {gender && <span>| {gender}</span>}
        </div>
        <p className="mt-2 text-center text-slate-300 min-h-[44px] text-sm font-mono break-words whitespace-pre-line max-h-32 overflow-auto transition-all">
          {about || <span className="italic opacity-50">No bio. Edit your profile &rarr;</span>}
        </p>
        <div className="mt-4 w-full">
          <h3 className="font-mono text-blue-300 text-xs font-bold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2 min-h-[24px]">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <span
                  key={skill}
                  className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold font-mono animate-chip-in"
                  style={{ animationDelay: `${0.03 * idx}s` }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="italic text-slate-400 text-xs">No skills listed</span>
            )}
          </div>
        </div>
      </aside>
      {/* Tailwind custom animation keyframes */}
      <style>
        {`
          @keyframes fade-in-fast { 0%{opacity:0} 100%{opacity:1} }
          .animate-fade-in-fast { animation: fade-in-fast 0.6s cubic-bezier(.23,1.02,.45,1) both; }
          
          @keyframes fade-in-slow { 0%{opacity:0;transform:translateY(20px);} 100%{opacity:1;transform:none;} }
          .animate-fade-in-slow { animation: fade-in-slow 1.2s cubic-bezier(.23,1,.32,1.19) both;}

          @keyframes slide-up { 0%{opacity:0;transform:translateY(44px);} 100%{opacity:1;transform:none;} }
          .animate-slide-up { animation: slide-up 0.85s cubic-bezier(.22,1,.36,1) both;}
          
          @keyframes chip-in { from{opacity:0;transform:scale(0.7);} to{opacity:1;transform:scale(1);} }
          .animate-chip-in { animation: chip-in 0.25s cubic-bezier(.6,1.2,.3,1) both;}
          
          @keyframes pop-in { 0%{opacity:0; transform: scale(0.8);} 80%{transform: scale(1.07);} 100%{opacity:1;transform:scale(1);} }
          .animate-pop-in { animation: pop-in 0.5s cubic-bezier(.22,1,.36,1.23) both;}

          @keyframes float-x { 0%,100%{transform:translateY(0);} 50%{transform:translateY(24px);} }
          .animate-float-x { animation: float-x 6s ease-in-out infinite;}

          @keyframes float-y { 0%,100%{transform:translateX(0);} 50%{transform:translateX(-18px);} }
          .animate-float-y { animation: float-y 7.5s ease-in-out infinite;}

          @keyframes avatar-glow { 0%,100%{opacity:0.13;} 50%{opacity:0.23;} }
          .animate-avatar-glow { animation: avatar-glow 3.9s ease-in-out infinite;}
          
          @keyframes avatar-fade { from{opacity:0;filter:blur(12px);} to{opacity:1;filter:none;} }
          .animate-avatar-fade { animation: avatar-fade 1s cubic-bezier(.22,1,.36,1.15) both;}

          @keyframes bounce-slow { 0%,100%{transform:translateY(0);} 35%{transform:translateY(-8px);} 75%{transform:translateY(4px);}
          90%{transform:translateY(-2px);} }
          .animate-bounce-slow { animation: bounce-slow 2.3s infinite cubic-bezier(.62,1.2,.38,1);}
        `}
      </style>
    </div>
  );
}
