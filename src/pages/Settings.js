import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/Dashboard/Navbar/Navbar";

const Settings = () => {

    const { userAuth, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({emailAddress: "", username: userAuth.username, password: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: "", password: ""});

    const baseUrl = "http://localhost:8080/api";

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
    }

    const validateForm = (data) => {
        const errors = {emailAddress:"", password:""};
    
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!data.emailAddress) {
            errors.emailAddress = "Email address is required";
        } 
        else if (!(emailPattern.test(data.emailAddress))) {
            errors.emailAddress = "Not a valid email address";
        }
        if (!data.password) {
            errors.password = "Password is required";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        setFormValidationErrors(errors);
        return errors;
    }

    const handleEditUser = async () => {
        
    }


	return (
        <div>
            <NavBar />
        
            <main className="settings-container">

                <h2>Settings</h2>

                <div className="user-box">

                    <h3>Edit username and email adress:</h3>
                
                    <form onSubmit={handleEditUser}>
                        <div>
                            <input type="text" 
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.emailAddress !== "" && <p id="user-error">{formValidationErrors.emailAddress}</p>}
                        </div>

                        <div>
                            <input type="email" 
                            placeholder="Email address"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.emailAddress !== "" && <p id="user-error">{formValidationErrors.emailAddress}</p>}
                        </div>
                        
                        <div> 
                            <input type="password" 
                            placeholder="Current password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.emailAddress !== "" && <p id="user-error">{formValidationErrors.emailAddress}</p>}
                        </div>

                        {credentialsError !== "" && <p id="user-error">{credentialsError}</p>}
                        <button>Save changes</button>
                    </form>
                </div>

            </main>
        </div>
	)

}

export default Settings;