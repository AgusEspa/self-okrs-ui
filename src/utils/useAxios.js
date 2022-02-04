import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAxios = () => {

    const { userAuth, setUserAuth, logout } = useContext(AuthContext);

	const baseURL = "http://localhost:8080/api";
	const refreshURL = `${baseURL}/users/token/refresh`; 

	const axiosInstance = axios.create({
		baseURL: baseURL,
		timeout: 10000,
		headers: { 'Authorization': `Bearer ${userAuth.accessToken}`}
	});

	const refreshToken = async () => {

		const config = {
			headers: {
				'Authorization': `Bearer ${userAuth.refreshToken}`
			}
		}

		try {
			const response = await axios.get(refreshURL, config);
			
			window.localStorage.setItem("access_token", response.data.access_token);

			setUserAuth(prevState => ( {
				username: prevState.username,
				accessToken: response.data.access_token,
				refreshToken: prevState.refreshToken
			}));

		return response.data.access_token;
		} catch (error) {
			logout();
		}
		
	}

	axiosInstance.interceptors.request.use(async request => {

		const decodedToken = jwt_decode(userAuth.accessToken);
		const tokenExpirationDate = decodedToken.exp;
		const currentTime = new Date().getTime() / 1000;
	
		const isValid = tokenExpirationDate > currentTime;
	
		if (isValid) return request;

		const refreshedToken = await refreshToken();
		
		request.headers.Authorization = `Bearer ${refreshedToken}`;
		return request;

	});

	axiosInstance.interceptors.response.use( response => {

		return response;
		
		}, async error => {

			if (error.status !== 403) return error;
	
			const refreshedToken = await refreshToken();

			//refactor, cancel before
			if (refreshToken === undefined) return error;

			const originalRequest = error.config;

			originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

			return axiosInstance(originalRequest);
	
	});
    
    return axiosInstance;
}

export default useAxios;