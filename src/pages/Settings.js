import { useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/Dashboard/Navbar/Navbar";

const Settings = () => {

    const { userAuth, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({username: userAuth.username, emailAddress: userAuth.emailAddress, oldPassword: "", newPassword: "", passwordVerification: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({emailAddress: "", password: ""});

	const api = useAxios();

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
    }

    const validateForm = (data) => {
        const errors = {username:"", emailAddress: "", oldPassword: "", newPassword: "",passwordVerification: ""};
    
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

        if (!data.oldPassword) {
            errors.oldPassword = "Password is required";
        } else if (data.oldPassword.length < 8) {
            errors.oldPassword = "Password must be at least 8 characters long";
        }

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

    const handleEditUser = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);
        
        if (validationErrors.emailAddress === "" && validationErrors.username === "" && validationErrors.oldPassword === "" && validationErrors.newPassword === "" && validationErrors.passwordVerification === "" ) {
            
            try {
                await api.put("/users", formData);
                logout();

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

    const handleDeleteUser = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);
        
        if (validationErrors.emailAddress === "" && validationErrors.username === "" && validationErrors.oldPassword === "" && validationErrors.newPassword === "" && validationErrors.passwordVerification === "" ) {

            try {
                await api.delete("/users", formData);
                logout();
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

    }


	return (
        <div>
            <NavBar />
        
            <main className="settings-container">

                <h2>Account Settings</h2>

                <div className="user-box">

                    <h3>Edit username and email address</h3>
                
                    <form onSubmit={handleEditUser}>
                        <div>
                            <label className="input-label">Username:</label>
                            <input type="text" 
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.username !== "" && <p id="user-error">{formValidationErrors.username}</p>}
                        </div>

                        <div>
                            <label className="input-label">Email address:</label>
                            <input type="text" 
                            placeholder="Email address"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.emailAddress !== "" && <p id="user-error">{formValidationErrors.emailAddress}</p>}
                        </div>
                        
                        <div> 
                            <label className="input-label">Current password:</label>
                            <input type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.oldPassword !== "" && <p id="user-error">{formValidationErrors.oldPassword}</p>}
                        </div>

                        {credentialsError !== "" && <p id="user-error">{credentialsError}</p>}
                        <button>Save changes</button>
                    </form>
                </div>

                <div className="user-box">

                    <h3>Change password</h3>
                
                    <form onSubmit={handleEditUser}>
                        <div> 
                            <label className="input-label">Current password:</label>
                            <input type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.oldPassword !== "" && <p id="user-error">{formValidationErrors.oldPassword}</p>}
                            <label className="input-label">New password:</label>
                            <input type="password" 
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.newPassword !== "" && <p id="user-error">{formValidationErrors.newPassword}</p>}
                            <label className="input-label">Re-enter password:</label>
                            <input type="password" 
                            name="passwordVerification"
                            value={formData.passwordVerification}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.passwordVerification !== "" && <p id="login-error">{formValidationErrors.passwordVerification}</p>}
                        </div>

                        {credentialsError !== "" && <p id="user-error">{credentialsError}</p>}
                        <button>Save changes</button>
                    </form>
                </div>

                <div className="user-box">
                    <h3>Permanently Delete Account</h3>
                    <form onSubmit={handleDeleteUser}>
                        <div>
                            <label className="input-label">Email address:</label>
                            <input type="text" 
                            placeholder="Email address"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormChange}
                            />
                            {formValidationErrors.emailAddress !== "" && <p id="user-error">{formValidationErrors.emailAddress}</p>}
                            <label className="input-label">Current password:</label>
                            <input type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                        </div>
                        {credentialsError !== "" && <p id="user-error">{credentialsError}</p>}
                        <button>Delete</button>
                        <span>WARNING - All content will be lost.</span>
                    </form>

                </div>

            </main>
        </div>
	)

}

export default Settings;