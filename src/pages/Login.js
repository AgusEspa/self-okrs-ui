import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const [loginFormData, setLoginFormData] = useState({emailAddress: "", password: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: "", password: ""});
    const { setUserAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const baseUrl = "http://localhost:8080";

    const handleLoginFormChange = (event) => {
        const {name, value} = event.target;
        setLoginFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
        setFormValidationErrors( prevState => ({
            ...prevState,
            [name]: "" 
        }));
    }

    const validateForm = (data) => {
        const errors = {emailAddress:"", password:""};
    
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!data.emailAddress) {
            errors.emailAddress = "Email address is required";
        } 
        else if (!(emailPattern.test(data.emailAddress))) {
            errors.emailAddress = "Please enter a valid email address";
        }
        if (!data.password) {
            errors.password = "Password is required";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        setFormValidationErrors(errors);
        return errors;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(loginFormData);

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
            window.localStorage.setItem("email_address", response.data.emailAddress);
            window.localStorage.setItem("access_token", response.data.access_token);
            window.localStorage.setItem("refresh_token", response.data.refresh_token);
            
            setUserAuth({
                username: response.data.username,
                emailAddress: response.data.emailAddress,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            });

            navigate("/dashboard");

        } catch (error) {
            if (!error.response) {
                //console.log(error);
                setCredentialsError("Unable to contact the server. Please try again later.");
            } else {
                //console.log(error);
                setCredentialsError("Incorrect email / password");
            }
        }
    }

	return (
        <main className="login-container">
            <div className="login-box">
                <div className="logo-box">
                    <img className="logo" src={"./logo.png"} alt="self.OKRs logo"/> 
                </div>

                <form onSubmit={handleLogin} noValidate>
                    {formValidationErrors.emailAddress !== "" ?
                    <div>
                        <input id="validation-error" type="email"
                        placeholder="Email address"
                        name="emailAddress"
                        value={loginFormData.emailAddress}
                        onChange={handleLoginFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.emailAddress}</p>
                    </div> :
                    <div>
                        <input type="email" 
                        placeholder="Email address"
                        name="emailAddress"
                        value={loginFormData.emailAddress}
                        onChange={handleLoginFormChange}
                        />
                    </div>
                    }
                    {formValidationErrors.password !== "" ?
                    <div> 
                        <input id="validation-error" type="password" 
                        placeholder="Password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.password}</p>
                    </div> :
                    <input type="password" 
                        placeholder="Password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginFormChange}
                        />
                    }
                    {credentialsError !== "" && <p id="validation-error-message">{credentialsError}</p>}
                    <button>Log in</button>
                </form>
                <div><p>Forgot your password? <Link to="/register">Reset</Link></p></div>
                <div><p>New to self.OKRs? <Link to="/register">Register</Link></p></div>
            </div>
        </main>
	)

}

export default Login;