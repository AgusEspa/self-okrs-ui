import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.scss";
import resources from "../styles/Resources.module.scss";

const Login = () => {

    const [loginFormData, setLoginFormData] = useState({emailAddress: "", password: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [networkError, setNetworkError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonIsEnabled, setButtonIsEnabled] = useState(true);
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
    }

    const validateForm = (data) => {
        const errors = {emailAddress:"", password:""};
        
        setFormValidationErrors(errors);
    
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

        setCredentialsError("");
        setNetworkError("");

        const validationErrors = validateForm(loginFormData);

        if (validationErrors.emailAddress === "" && validationErrors.password === "") {
            setIsLoading(true);
            setButtonIsEnabled(false);
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

            window.localStorage.setItem("access_token", response.data.access_token);
            window.localStorage.setItem("refresh_token", response.data.refresh_token);
            
            setUserAuth( prevState => ({
                ...prevState,
                accessToken: window.localStorage.getItem("access_token"),
                refreshToken: window.localStorage.getItem("refresh_token")}
            ));

            navigate("/dashboard");

        } catch (error) {
            setIsLoading(false);
            setButtonIsEnabled(true);
            if (!error.response || error.response.status >= 500) {
                setNetworkError("Unable to contact the server. Please try again later.");
            } else {
                setCredentialsError("Incorrect email / password");
            }
        }
    }

	return (
        <main className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <div className={styles.logoBox}>
                    <img className={styles.logo} src={"./logo.png"} alt="self.OKRs logo"/> 
                </div>

                <form onSubmit={handleLogin} noValidate>
                    {formValidationErrors.emailAddress !== "" ?
                    <div>
                        <input className={styles.validationError} type="email"
                        placeholder="Email address"
                        name="emailAddress"
                        value={loginFormData.emailAddress}
                        onChange={handleLoginFormChange}
                        />
                        <p className={styles.validationErrorMessage}>{formValidationErrors.emailAddress}</p>
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
                        <input className={styles.validationError} type="password" 
                        placeholder="Password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginFormChange}
                        />
                        <p className={styles.validationErrorMessage}>{formValidationErrors.password}</p>
                    </div> :
                    <input type="password" 
                        placeholder="Password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginFormChange}
                        />
                    }
                    {credentialsError !== "" && <p className={styles.validationErrorMessage}>{credentialsError}</p>}
                    {buttonIsEnabled ? 
                        <button>Log in</button> :
                        <button disabled>Loging in...</button>
                    }   
                </form>

                {isLoading &&
                <div className={styles.loadingSpinnerContainer}>
                    <div className={resources.spinner}></div>
                </div>
                }

                {networkError !== "" && 
                    <div className={styles.loginErrorMessage}>
                        <p>{networkError}</p>
                    </div>}
                <div className={styles.loginLink}><p>Forgot your password? <Link to="/forgot_password">Reset</Link></p></div>
                <div className={styles.loginLink}><p>New to self.OKRs? <Link to="/register">Register</Link></p></div>
            </div>
        </main>
	)

}

export default Login;