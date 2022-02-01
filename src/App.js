import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
// import axios from 'axios';

function App() {

    //const baseUrl = 'http://localhost:8080';

    const [userAuth, setUserAuth] = useState([]);


    useEffect(() => {
        const fetchedAccessToken = window.localStorage.getItem("access_token");
        const fetchedRefreshToken = window.localStorage.getItem("refresh_token");
        const fetchedUsername = window.localStorage.getItem("username");

        setUserAuth( {
            "username": fetchedUsername,
            "access_token": fetchedAccessToken,
            "refresh_token": fetchedRefreshToken
        })
    }, []);

    // useEffect(() => {
	// 	const config = { headers: { Authorization: `Bearer ${accessToken}` } };
	// 	axios.get(`${baseUrl}/api/users/authenticated`, config)
	// 		.then(response => {
	// 			setUsername(response.data.username);
	// 		})
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, [accessToken]);
  
    if (userAuth.username !== null && userAuth.username !== undefined && userAuth.username !== '') {
        return (
            <AuthContext.Provider value={{userAuth, setUserAuth}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        );
    } else return (
        <AuthContext.Provider value={{userAuth, setUserAuth}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
