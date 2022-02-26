import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({emailAddress: "", username:"", password: "", passwordVerification:""});
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: "", password: ""});
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

  	const handleRegistration = async (event) => {
		event.preventDefault();

		const requestBody = {username: formData.username, 
			emailAddress: formData.emailAddress,
			password: formData.password};

		try {
			await axios.post(`${baseUrl}/users/signup`, requestBody);
			navigate("/dashboard");
		} catch (error) {
			console.log(`Error: ${error.response.data}`)
			setCredentialsError(error.response.data);
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
                        <input type="text" 
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.emailAddress !== "" && <p id="login-error">{formValidationErrors.emailAddress}</p>}
                    </div>

                    <div>
                        <input type="email" 
                        placeholder="Email address"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.emailAddress !== "" && <p id="login-error">{formValidationErrors.emailAddress}</p>}
                    </div>
                    
                    <div> 
                        <input type="password" 
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        />
                        <input type="password" 
                        placeholder="Repeat password"
                        name="passwordVerification"
                        value={formData.passwordVerification}
                        onChange={handleFormChange}
                        />
                        {formValidationErrors.emailAddress !== "" && <p id="login-error">{formValidationErrors.emailAddress}</p>}
                    </div>

                    {credentialsError !== "" && <p id="login-error">{credentialsError}</p>}
                    <button>Create account</button>
                </form>
            </div>
        </main>
	)
}

export default Register;