import { useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const navigate = useNavigate();

	const logout = () => {
		window.localStorage.removeItem("access_token");
		window.localStorage.removeItem("refresh_token");
		window.localStorage.removeItem("username");
		setUserAuth([]);
		navigate('/login');
	}

	const [userAuth, setUserAuth] = useState({
		username: window.localStorage.getItem("username"),
		accessToken: window.localStorage.getItem("access_token"),
		refreshToken: window.localStorage.getItem("refresh_token")});

	return(
		<AuthContext.Provider value={{ userAuth, setUserAuth, logout }} >
			{children}
		</AuthContext.Provider>
	);
}
 