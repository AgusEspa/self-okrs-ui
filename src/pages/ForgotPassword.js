import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {

    const [formData, setFormData] = useState({emailAddress: ""});
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: ""});
    const [networkError, setNetworkError] = useState("");
	const [isSent, setIsSent] = useState("");

	const baseUrl = "http://localhost:8080/api";

	const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
    }

    const validateForm = (data) => {
        const errors = {emailAddress: ""};
    
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!data.emailAddress) {
            errors.emailAddress = "Email address is required";
        } 
        else if (!(emailPattern.test(data.emailAddress))) {
            errors.emailAddress = "Please enter a valid email address";
        }

        setFormValidationErrors(errors);
        return errors;
    }

  	const handleResetPasswordRequest = async (event) => {
		event.preventDefault();

        const validationErrors = validateForm(formData);

        if (validationErrors.emailAddress === "") {

            setFormValidationErrors({emailAddress: ""});
            setNetworkError("");

            try {
                await axios.post(`${baseUrl}/users/forgot_password`, formData);
                setIsSent(true);
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

                <form onSubmit={handleResetPasswordRequest} noValidate>

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
                    
                    <button>Submit</button>
                    {networkError !== "" && 
                    <div className="registration-error-message">
                        <p>{networkError}</p>
                    </div>}
                    {isSent && 
                    <div className="successful-registration">
                    <p>Your request was sent.</p>
                    <p>Please check your inbox.</p>
                    </div>}

                </form>

                
            </div>
        </main>
	)
}

export default ForgotPassword;