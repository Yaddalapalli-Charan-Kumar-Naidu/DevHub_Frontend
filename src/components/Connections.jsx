import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../store/connectionSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || "/api"}/user/connections`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(addconnection(response?.data?.Connections));
    } catch (err) {
      console.log("Error fetching connections", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
        Your Connections
      </h2>
      <div className="space-y-6">
        {connections.length === 0 ? (
          <p className="text-gray-500 text-center">No connections yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 h-full"
              >
                {/* Content Section (Scrollable if needed) */}
                <div className="flex-grow overflow-y-auto">
                  <div className="flex items-center space-x-4">
                    <img
                      src={connection.photoURL}
                      alt={`${connection.firstName} ${connection.lastName}`}
                      className="w-16 h-16 rounded-full border-2 border-gray-600"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">
                        {connection.firstName} {connection.lastName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Age: {connection.age}
                      </p>
                      <p className="text-sm text-gray-400">
                        Gender: {connection.gender}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-300 mb-2">
                      Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {connection.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-300">About:</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {connection.about}
                    </p>
                  </div>
                </div>

                {/* Chat Button (Fixed at the Bottom) */}
                <div className="mt-6 text-center">
                  <Link
                    to={`/chat/${connection._id}`}
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    Chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;