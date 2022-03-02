import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({emailAddress: "", username:"", password: "", passwordVerification:""});
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: "", username:"", password: "", passwordVerification:""});
    const [credentialsError, setCredentialsError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
	const [passwordHelperDisplay, setPasswordHelperDisplay] = useState(false);
	const navigate = useNavigate();

	const baseUrl = "http://localhost:8080/api";

	const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
    }

    const validateForm = (data) => {
        const errors = {emailAddress: "", username:"", password: "", passwordVerification:""};
    
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!data.emailAddress) {
            errors.emailAddress = "Email address is required";
        } 
        else if (!(emailPattern.test(data.emailAddress))) {
            errors.emailAddress = "Please enter a valid email address";
        }

        if (!data.username) {
            errors.username = "Username is required";
        } 
        else if (data.username.length < 3) {
            errors.username = "Username must be at least 3 characters long";
        }

        if (!data.password) {
            errors.password = "Password is required";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        if (!data.passwordVerification) {
            errors.passwordVerification = "Plese re-enter the password";
        } else if (data.password !== data.passwordVerification) {
            errors.passwordVerification = "Passwords don't match";
        }

        setFormValidationErrors(errors);
        return errors;
    }

  	const handleRegistration = async (event) => {
		event.preventDefault();

        const validationErrors = validateForm(formData);

        if (validationErrors.emailAddress === "" && validationErrors.username === "" && validationErrors.password === "" && validationErrors.passwordVerification === "") {
        
            const requestBody = {username: formData.username, 
                emailAddress: formData.emailAddress,
                password: formData.password};

                setFormValidationErrors({emailAddress: "", username:"", password: "", passwordVerification:""});
                setCredentialsError("");

            try {
                await axios.post(`${baseUrl}/users/signup`, requestBody);
                setIsRegistered(true);
                await new Promise(resolve => setTimeout(resolve, 4000));
                navigate("/login");
            } catch (error) {
                if (!error.response) {
                    //console.log(error);
                    setCredentialsError("Unable to contact the server. Try again later.");
                } else {
                    if (error.response.status === 422) {
                        setFormValidationErrors( prevState => ({
                            ...prevState,
                            emailAddress: error.response.data 
                        }));
                    } else setCredentialsError(error.response.data);
                    //console.log(`Error: ${error.response.data}`);
                    
                }
            } 
        }
  	}


	return (
		<main className="register-container">
            <div className="register-box">
                <div className="logo-box">
					<img className="logo" src={"./logo.png"} alt="self.OKRs logo"/>
				</div>  

                <form onSubmit={handleRegistration} noValidate>

                    <label>Username:</label>
                    {formValidationErrors.username !== "" ?
                    <div>
                    <input id="validation-error" type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.username}</p>
                    </div> :
                    <input type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        />
                    }

                    <label>Email address:</label>
                    {formValidationErrors.emailAddress !== "" ?
                    <div>
                        <input id="validation-error" type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.emailAddress}</p>
                    </div> :
                    <input type="email" 
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleFormChange}
                    />
                    }

                    <div className="password">
                        <label>Password:</label>
                        <img src={"./info.png"} alt="information icon"
                            onMouseEnter={() => setPasswordHelperDisplay(true)}
        				    onMouseLeave={() => setPasswordHelperDisplay(false)} />
                        {passwordHelperDisplay && <span className="password-helper">Password must have at least 8 characters</span>}
                    </div>
                    {formValidationErrors.password !== "" ?
                    <div> 
                        <input id="validation-error" type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.password}</p>
                    </div> :
                    <input type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    />
                    }

                    <label>Re-enter password:</label>
                    {formValidationErrors.passwordVerification !== "" ?
                    <div> 
                        <input id="validation-error" type="password" 
                        name="passwordVerification"
                        value={formData.passwordVerification}
                        onChange={handleFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.passwordVerification}</p>
                    </div> :
                    <input type="password" 
                    name="passwordVerification"
                    value={formData.passwordVerification}
                    onChange={handleFormChange}
                    />
                    }
                    
                    {credentialsError !== "" && <p id="validation-error-message">{credentialsError}</p>}
                    <button>Create account</button>
                    {isRegistered && 
                    <div className="successful-registration">
                    <p>Your account was succesfully created.</p>
                    <p>Redirecting to login...</p>
                    </div>}
                </form>

                
            </div>
        </main>
	)
}

export default Register;