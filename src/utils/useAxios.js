import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useRefreshToken from "./useRefreshToken";

const useAxios = () => {

    const { userAuth, setUserAuth, logout } = useContext(AuthContext);

	const refresh = useRefreshToken();

	const baseURL = "http://localhost:8080/api";

	const axiosInstance = axios.create({
		baseURL: baseURL,
		timeout: 10000,
		headers: { 'Authorization': `Bearer ${userAuth.accessToken}`}
	});

	

	axiosInstance.interceptors.request.use(async request => {

		const decodedToken = jwt_decode(userAuth.accessToken);
		const tokenExpirationDate = decodedToken.exp;
		const currentTime = new Date().getTime() / 1000;
	
		const isValid = tokenExpirationDate > currentTime;
	
		if (isValid) return request;

		const refreshedToken = await refresh();
		
		request.headers.Authorization = `Bearer ${refreshedToken}`;
		return request;

	});

	axiosInstance.interceptors.response.use( response => {

		return response;
		
		}, async error => {

			if (error.status !== 403) return error;
	
			const refreshedToken = await refresh();

			//refactor, cancel before
			if (refreshedToken === undefined) return error;

			const originalRequest = error.config;

			originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

			return axiosInstance(originalRequest);
	
	});
    
    return axiosInstance;
}

export default useAxios;