import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const baseUrl = 'http://localhost:8080';

  	const handleRegistration = (event) => {
		event.preventDefault();

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
			setEmailAddress('');
			setPassword('');
			navigate('/login');
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

			<h3>Register</h3>
		
			<form onSubmit={handleRegistration}>
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
		</div>
	)
}

export default Register;