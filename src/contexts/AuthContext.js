import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState({
		username: window.localStorage.getItem("access_token"),
		accessToken: window.localStorage.getItem("refresh_token"),
		refreshToken: window.localStorage.getItem("username")}
	);

	const navigate = useNavigate();

	// const updateToken = async () => {

	// 	try {
	// 		// call refresh
        
	// 		if (response.status === 200) {
	// 			// change accessToken
    //     	} else {
    //         	logout();
	// 		}
    //     } catch (e) {
	// 		console.log(`Error: ${e}`);
	// 	}
    // }



	const logout = () => {
		window.localStorage.removeItem("access_token");
		window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("username");
		navigate('/');
	}

	

    // useEffect(()=> {

    //     if(loading){
    //         updateToken()
    //     }

    //     let fourMinutes = 1000 * 60 * 4

    //     let interval =  setInterval(()=> {
    //         if(authTokens){
    //             updateToken()
    //         }
    //     }, fourMinutes)
    //     return ()=> clearInterval(interval)

    // }, [authTokens, loading])

	return(
		<AuthContext.Provider value={{ userAuth, setUserAuth, logout }} >
			{children}
		</AuthContext.Provider>
	);
}
 