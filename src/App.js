import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

function App() {

    const [userAuth, setUserAuth] = useState([]);

    useEffect(() => {
        const fetchedAccessToken = window.localStorage.getItem("access_token");
        const fetchedRefreshToken = window.localStorage.getItem("refresh_token");
        const fetchedUsername = window.localStorage.getItem("username");

        setUserAuth( {
            username: fetchedUsername,
            accessToken: fetchedAccessToken,
            refreshToken: fetchedRefreshToken
        })
    }, []);
  
    return (
        <AuthContext.Provider value={{userAuth, setUserAuth}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                        element={
                            <PublicRoute><Home /></PublicRoute>}
                    />

                    <Route path="/dashboard"
                        element={
                            <ProtectedRoute><Dashboard /></ProtectedRoute>}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;