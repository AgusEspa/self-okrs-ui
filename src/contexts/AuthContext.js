import { useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState({
		username: window.localStorage.getItem("username"),
		accessToken: window.localStorage.getItem("access_token"),
		refreshToken: window.localStorage.getItem("refresh_token")}
	);

	const navigate = useNavigate();

	const baseUrl = 'http://localhost:8080';

	const updateToken = async () => {

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
		navigate('/');
	}

	return(
		<AuthContext.Provider value={{ userAuth, setUserAuth, logout, updateToken }} >
			{children}
		</AuthContext.Provider>
	);
}
 