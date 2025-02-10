import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("token"); // Get token from cookies

    if (!token) {
        return <Navigate to="/login" replace />; // Correct way to redirect
    }

    return children; // Render protected content if authenticated
};

export default ProtectedRoute;
