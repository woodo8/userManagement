import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import decode from "jwt-decode"
const ProtectedRoutes = () => {
    try {
        const loggedIn = localStorage.getItem("access");

        const decodedToken = decode(loggedIn)

        const tokenValid = decodedToken?.exp * 1000 < new Date().getTime()

        if (!tokenValid) {
            return <Outlet />
        } else {
            localStorage.removeItem("access")
            return <Navigate to="/auth" />
        }
    } catch (error) {
        localStorage.removeItem("access")
        return <Navigate to="/auth" />
    }
};
export default ProtectedRoutes;