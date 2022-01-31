import { useState } from "react";
import axios from 'axios';

const Login = (props) => {

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const baseUrl = 'http://localhost:8080';

  const handleLogin = (event) => {
    event.preventDefault();
    loginService(emailAddress, password);
    setEmailAddress('');
    setPassword('');
  }

  const loginService = () => {
    const credentials = new URLSearchParams();
    credentials.append('username', emailAddress);
    credentials.append('password', password);
  
    const config = {
    	headers: {
    	  'Content-Type': 'application/x-www-form-urlencoded'
    	}
    }
      
    axios.post(`${baseUrl}/login`, credentials, config)
      .then(response => {
        if (response.status === 200) return response.data;
        else alert("error");
      })
      .then(data => {
        window.localStorage.setItem("access_token", data.access_token);
        props.setAccessToken(data.access_token);
        window.localStorage.setItem("refresh_token", data.refresh_token);
        props.setRefreshToken(data.refresh_token);
      })
      .catch((error) => {
      	console.log(`Error: ${error}`)
      })
  }

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

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
				<button type="submit">Log in</button>
			</form>

      <div><p>New to Self.OKRs? Create account</p></div>
		</div>
	)

}

export default Login;