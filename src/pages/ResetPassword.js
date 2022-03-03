import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [formData, setFormData] = useState({newPassword: "", passwordVerification:""});
    const [formValidationErrors, setFormValidationErrors] = useState({password: "", passwordVerification:""});
    const [networkError, setNetworkError] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
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
        const errors = {newPassword: "", passwordVerification:""};

        if (!data.newPassword) {
            errors.newPassword = "Password is required";
        } else if (data.newPassword.length < 8) {
            errors.newPassword = "Password must be at least 8 characters long";
        }

        if (!data.passwordVerification) {
            errors.passwordVerification = "Plese re-enter the password";
        } else if (data.newPassword !== data.passwordVerification) {
            errors.passwordVerification = "Passwords don't match";
        }

        setFormValidationErrors(errors);
        return errors;
    }

  	const handlePasswordReset = async (event) => {
		event.preventDefault();

        const validationErrors = validateForm(formData);

        if (validationErrors.newPassword === "" && validationErrors.passwordVerification === "") {

            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
        
            const requestBody = {newPassword: formData.newPassword, 
                passwordToken: token};

                setFormValidationErrors({newPassword: "", passwordVerification:""});
                setNetworkError("");

            try {
                await axios.put(`${baseUrl}/users/reset_password`, requestBody);
                setIsSubmited(true);
                await new Promise(resolve => setTimeout(resolve, 4000));
                navigate("/login");
            } catch (error) {
                if (!error.response || error.response.status >= 500) {
                    setNetworkError("Unable to contact the server. Please try again later.");
                } else if (error.response.status) {
                    if (error.response.data.includes("email"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        emailAddress: error.response.data 
                    }));
                } else setNetworkError(error.response.data);     
            } 
        }
  	}


	return (
		<main className="register-container">
            <div className="register-box">
                <div className="logo-box">
					<img className="logo" src={"./logo.png"} alt="self.OKRs logo"/>
				</div>  

                <form onSubmit={handlePasswordReset} noValidate>

                    <div className="password">
                        <label>New Password:</label>
                        <img src={"./info.png"} alt="information icon"
                            onMouseEnter={() => setPasswordHelperDisplay(true)}
        				    onMouseLeave={() => setPasswordHelperDisplay(false)} />
                        {passwordHelperDisplay && <span className="password-helper">Password must have at least 8 characters</span>}
                    </div>
                    {formValidationErrors.newPassword !== "" ?
                    <div> 
                        <input id="validation-error" type="password" 
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleFormChange}
                        />
                        <p id="validation-error-message">{formValidationErrors.newPassword}</p>
                    </div> :
                    <input type="password" 
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleFormChange}
                    />
                    }

                    <label>Confirm password:</label>
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
                    
                    <button>Submit</button>
                    {networkError !== "" && 
                    <div className="registration-error-message">
                        <p>{networkError}</p>
                    </div>}
                    {isSubmited && 
                    <div className="successful-registration">
                    <p>Your password was reset succesfully.</p>
                    <p>Redirecting to login...</p>
                    </div>}

                </form>

                
            </div>
        </main>
	)
}

export default ResetPassword;