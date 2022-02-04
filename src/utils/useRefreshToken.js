import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRefreshToken = () => {

    const { userAuth, setUserAuth } = useContext(AuthContext);

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

		const response = await axios.get(refreshURL, config);

		//log out if request unsuccessful
				
		window.localStorage.setItem("access_token", response.data.access_token);

		setUserAuth(prevState => ( {
			username: prevState.username,
			accessToken: response.data.access_token,
			refreshToken: prevState.refreshToken
		}));

		return response.data.access_token;

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

	}, error => {
		return Promise.reject(error);
	});


	// axios.interceptors.response.use( response => {
	// 	console.log("Hi");
	// 	return response;
		
	// 	}, async error => {

	// 		if (error.response.status !== 403) {
	// 			return new Promise((resolve, reject) => {
	// 			  reject(error);
	// 			});
	// 		  }
		

			
			
	// 	// axios.request.headers.Authorization = `Bearer ${newResponse.data.access_token}`;
	// 	// return axios.request;

	// 	return error;
	// });
    
    return axiosInstance;
}

export default useRefreshToken;