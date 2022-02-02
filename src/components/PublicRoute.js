import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    
    const isAuthenticated = Boolean(localStorage.getItem("username"));

    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}    

export default PublicRoute;