import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ image, name, age, gender, about }) => {
  const [status, setStatus] = useState(null);
  const [gone, setGone] = useState(false);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setStatus("interested");
      setGone(true);
    } else if (info.offset.x < -100) {
      setStatus("ignored");
      setGone(true);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: gone ? 0 : 1, x: gone ? (status === "interested" ? 300 : -300) : 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 transition-transform duration-300"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        <div className="mt-2 text-gray-700">
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p className="mt-1"><strong>About:</strong> {about}</p>
        </div>

        {/* Ignore & Interested Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => {
              setStatus("ignored");
              setGone(true);
            }}
          >
            Ignore
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => {
              setStatus("interested");
              setGone(true);
            }}
          >
            Interested
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <p className={`mt-3 text-center font-medium ${status === "interested" ? "text-green-600" : "text-red-600"}`}>
            {status === "interested" ? "You are interested!" : "You ignored this profile."}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
