import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

function App() {

    const baseUrl = 'http://localhost:8080';

    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [username, setUsername] = useState('');


    useEffect(() => {
        const fetchedAccessToken = window.localStorage.getItem("access_token");
        setAccessToken(fetchedAccessToken);
        const fetchedRefreshToken = window.localStorage.getItem("refresh_token");
        setRefreshToken(fetchedRefreshToken);
    }, []);

    useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${accessToken}` } };
		axios.get(`${baseUrl}/api/users/authenticated`, config)
			.then(response => {
				setUsername(response.data.username);
			})
            .catch(error => {
                console.log(error);
            });
    }, [accessToken]);
  
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
            <Login 
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}/>
            }/>
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <Dashboard 
                    username={username}/>
            }/>
        </Routes>
        </BrowserRouter>

    );
}

export default App;
