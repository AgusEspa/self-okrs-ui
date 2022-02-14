import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { userAuth } = useContext(AuthContext);

    const isAuthenticated = userAuth.username;
    
    return (isAuthenticated) ? children : <Navigate to="/login" />;
}    

export default ProtectedRoute;