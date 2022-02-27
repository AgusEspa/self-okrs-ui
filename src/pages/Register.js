import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({emailAddress: "", username:"", password: "", passwordVerification:""});
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: "", username:"", password: "", passwordVerification:""});
    const [credentialsError, setCredentialsError] = useState("");
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
            errors.emailAddress = "Not a valid email address";
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

            try {
                await axios.post(`${baseUrl}/users/signup`, requestBody);
                navigate("/dashboard");
            } catch (error) {
                if (!error.response) {
                    //console.log(error);
                    setCredentialsError("Unable to contact the server. Try again later.");
                } else {
                    //console.log(`Error: ${error.response.data}`);
                    setCredentialsError(error.response.data);
                }
            } 
        }
  	}


	return (
		<main className="login-container">
            <div className="login-box">
                <div className="logo-box">
					<img className="logo" src={"./logo.png"} alt="self.OKRs logo"/>
				</div>  

                <form onSubmit={handleRegistration}>
					<div>
                        <label className="input-label">Username:</label>
                        <input type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.username !== "" && <p id="login-error">{formValidationErrors.username}</p>}
                    </div>

                    <div>
                        <label className="input-label">Email address:</label>
                        <input type="text" 
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.emailAddress !== "" && <p id="login-error">{formValidationErrors.emailAddress}</p>}
                    </div>
                    
                    <div> 
                        <label className="input-label">Password:</label>
                        <p id="description">Passwords must contain at least eight characters,<br/>including at least 1 letter and 1 number.</p>
                        <input type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.password !== "" && <p id="login-error">{formValidationErrors.password}</p>}
                        <label className="input-label">Re-enter password:</label>
                        <input type="password" 
                        name="passwordVerification"
                        value={formData.passwordVerification}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.passwordVerification !== "" && <p id="login-error">{formValidationErrors.passwordVerification}</p>}
                    </div>

                    {credentialsError !== "" && <p id="login-error">{credentialsError}</p>}
                    <button>Create account</button>
                </form>
            </div>
        </main>
	)
}

export default Register;