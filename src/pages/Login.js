import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const [loginFormData, setLoginFormData] = useState({emailAddress: "", password: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({});
    const { setUserAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const baseUrl = "http://localhost:8080";

    const handleLoginFormChange = (event) => {
        const {name, value} = event.target;
        setLoginFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
    }

    const validateForm = (data) => {
        const errors = {emailAddress:"", password:""};
        if (!data.emailAddress) errors.emailAddress = "Email is required";
        // email is valid
        if (!data.password) errors.password = "Password is required";
        // password is valid
        return errors;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(loginFormData);
        setFormValidationErrors(validationErrors);

        if (validationErrors.emailAddress === "" && validationErrors.password === "") {
            login();        
        }
    }

    async function login() {
        const credentials = new URLSearchParams();
        credentials.append("username", loginFormData.emailAddress);
        credentials.append("password", loginFormData.password);
        
        const config = {
    	    headers: {
    	        "Content-Type": "application/x-www-form-urlencoded"
    	    }
        }

        try {
            const response = await axios.post(`${baseUrl}/login`, credentials, config);

            window.localStorage.setItem("username", response.data.username);
            window.localStorage.setItem("access_token", response.data.access_token);
            window.localStorage.setItem("refresh_token", response.data.refresh_token);
            
            setUserAuth({
                username: response.data.username,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            });

            setLoginFormData({username: "", password: ""});

            navigate("/dashboard");

        } catch (e) {
            console.log(`Error: ${e}`);
            setCredentialsError("Incorrect email / password");
        }
    }

	return (
		<div className="login-box">
      <div className="logo-box">
        <img src={"./logo.png"} alt="self.OKRs logo"/> 
      </div>

			<h3>Welcome to self.OKRs</h3>
		
			<form onSubmit={handleLogin}>
				<div>
					<input type="email" 
                    placeholder="Email address"
                    name="emailAddress"
					value={loginFormData.emailAddress}
					onChange={handleLoginFormChange}
					/>
                    <div className="error"><span>{formValidationErrors.emailAddress}</span></div>
				</div>
                
				<div> 
					<input type="password" 
                    placeholder="Password"
                    name="password"
					value={loginFormData.password}
					onChange={handleLoginFormChange}
					/>
                    <div className="error"><span>{formValidationErrors.password}</span></div>
				</div>
                <div className="error"><span>{credentialsError}</span></div>
				<button>Log in</button>
			</form>
            <div><p>Forgot your password? <Link to="/register">Reset</Link></p></div>
            <div><p>New to Self.OKRs? <Link to="/register">Create account</Link></p></div>
		</div>
	)

}

export default Login;