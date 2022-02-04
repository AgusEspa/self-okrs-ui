import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRefreshToken = () => {

    const { userAuth, setUserAuth } = useContext(AuthContext);

	const baseURL = 'http://localhost:8080';

	const axiosInstance = axios.create({
		headers: { 'Authorization': `Bearer ${userAuth.accessToken}`}
	});

	axiosInstance.interceptors.request.use(async request => {

		const decodedToken = jwt_decode(userAuth.accessToken);
		const tokenExpirationDate = decodedToken.exp;
		const currentTime = new Date().getTime() / 1000;
	
		const isValid = tokenExpirationDate > currentTime;
	
		if (isValid) return request;

		const config = {
			headers: {
				'Authorization': `Bearer ${userAuth.refreshToken}`
			}
		}

		const response = await axios.get(`${baseURL}/api/users/token/refresh`, config);
				
		window.localStorage.setItem("access_token", response.data.access_token);

		setUserAuth(prevState => ( {
			username: prevState.username,
			accessToken: response.data.access_token,
			refreshToken: prevState.refreshToken
		}));
		
		request.headers.Authorization = `Bearer ${response.data.access_token}`;
		return request;

	});

	// axios.interceptors.response.use(async response => {

	// 	if (response.status === 200 ) return response;

	// 	const config = {
	// 		headers: {
	// 			'Authorization': `Bearer ${userAuth.refreshToken}`
	// 		}
	// 	}

	// 	const newResponse = await axios.get(`${baseURL}/api/users/token/refresh`, config);
				
	// 	window.localStorage.setItem("access_token", response.data.access_token);

	// 	setUserAuth(prevState => ( {
	// 		username: prevState.username,
	// 		accessToken: newResponse.data.access_token,
	// 		refreshToken: prevState.refreshToken
	// 	}));
		
	// 	request.headers.Authorization = `Bearer ${response.data.access_token}`;
	// 	return request;

	// });
    
    return axiosInstance;
}

export default useRefreshToken;