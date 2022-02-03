import { useState, createContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState({
		username: window.localStorage.getItem("username"),
		accessToken: window.localStorage.getItem("access_token"),
		refreshToken: window.localStorage.getItem("refresh_token")}
	);

	const navigate = useNavigate();

	const baseUrl = 'http://localhost:8080';

	useEffect(() => {

	}, []);

	const checkTokenValidity = () => {
		const decodedToken = jwt_decode(userAuth.accessToken);
		console.log(decodedToken);
		const tokenExpirationDate = decodedToken.exp;
		console.log(tokenExpirationDate);
		const currentTime = new Date().getTime() / 1000;
		console.log(currentTime);

		if (tokenExpirationDate < currentTime) updateToken();
	}

	const updateToken = async () => {
		console.log("updating token...");
		try {
			const config = {
				headers: {
					'Authorization': `Bearer ${userAuth.refreshToken}`
				}
			}
			const response = await axios.get(`${baseUrl}/api/users/token/refresh`, config);
        
			if (response.status === 200) {
				window.localStorage.setItem("access_token", response.data.access_token);
				setUserAuth({
					username: userAuth.username,
					accessToken: response.data.access_token,
					refreshToken: userAuth.refreshToken}
				);
        	} else {
            	logout();
			}
        } catch (e) {
			console.log(`Error: ${e}`);
			logout();
		}
    }

	const logout = () => {
		window.localStorage.removeItem("access_token");
		window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("username");
		setUserAuth([]);
		navigate('/');
	}

	return(
		<AuthContext.Provider value={{ userAuth, setUserAuth, logout, checkTokenValidity }} >
			{children}
		</AuthContext.Provider>
	);
}
 