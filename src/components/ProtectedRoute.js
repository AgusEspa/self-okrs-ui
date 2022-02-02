import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    
    const isAuthenticated = Boolean(localStorage.getItem("username"));

    return isAuthenticated ? children : <Navigate to="/login" />;
}    

export default ProtectedRoute;