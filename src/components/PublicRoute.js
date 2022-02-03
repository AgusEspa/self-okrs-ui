import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PublicRoute({ children }) {

    const { userAuth } = useContext(AuthContext);
    
    const isAuthenticated = userAuth.username;
    
    return (isAuthenticated) ? <Navigate to="/dashboard" /> : children;
}    

export default PublicRoute;