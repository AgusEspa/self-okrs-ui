import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { userAuth, setUserAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:8080';

    const handleLogin = (event) => {
        event.preventDefault();
        login();
    }

    async function login() {
        const credentials = new URLSearchParams();
        credentials.append('username', emailAddress);
        credentials.append('password', password);
        
        const config = {
    	    headers: {
    	        'Content-Type': 'application/x-www-form-urlencoded'
    	    }
        }

        try {
            const response = await axios.post(`${baseUrl}/login`, credentials, config);

            window.localStorage.setItem("username", response.data.username);
            window.localStorage.setItem("access_token", response.data.access_token);
            window.localStorage.setItem("refresh_token", response.data.refresh_token);
            
            setUserAuth( {
                username: response.data.username,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            });

            setEmailAddress('');
            setPassword('');

            navigate('/dashboard');

        } catch (e) {
            console.log(`Error: ${e}`);
            setError("Incorrect email / password");
        }
    }

    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    console.log(userAuth);
	return (
		<div className="login-box">
      <div className="logo-box">
        <img src={'./logo.png'} alt="self.OKRs logo"/> 
      </div>

			<h3>Welcome to self.OKRs</h3>
		
			<form onSubmit={handleLogin}>
				<div>
					<input type="text" placeholder="Email address"
					value={emailAddress}
					onChange={handleEmailAddressChange}
					/>
				</div>
				<div> 
					<input type="password" placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
					/>
				</div>
                <div className="error"><span>{error}</span></div>
				<button type="submit">Log in</button>
			</form>
            <div><p>Forgot your password? <Link to="/register">Reset</Link></p></div>
            <div><p>New to Self.OKRs? <Link to="/register">Create account</Link></p></div>
		</div>
	)

}

export default Login;