import { useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/Dashboard/Navbar/Navbar";

const Settings = () => {

    const { userAuth, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({username: userAuth.username, emailAddress: userAuth.emailAddress, oldPassword: "", newPassword: "", passwordVerification: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({username: "", emailAddress: "", oldPassword: "", newPassword: "", passwordVerification: ""});
    const [toggleUsername, setToggleUsername] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);

	const api = useAxios();

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
        setFormValidationErrors( prevState => ({
            ...prevState,
            [name]: "" 
        }));
        setCredentialsError("");
    }

    const validateDetailsForm = (data) => {
        const errors = {username:"", emailAddress: "", oldPassword: ""};
    
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

        if (!data.oldPassword) {
            errors.oldPassword = "Password is required";
        } else if (data.oldPassword.length < 8) {
            errors.oldPassword = "Password must be at least 8 characters long";
        }

        setFormValidationErrors(errors);
        return errors;
    }

    const handleEditUserDetails = async (event) => {
        event.preventDefault();

        const validationErrors = validateDetailsForm(formData);
        
        if (validationErrors.emailAddress === "" && validationErrors.username === "" && validationErrors.oldPassword === "") {
            
            try {
                await api.put("/users", formData);
                logout();

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

    const validatePasswordForm = (data) => {
        const errors = {oldPassword: "", newPassword: "", passwordVerification: ""};
    
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

    const handleEditUserPassword =  async (event) => {
        event.preventDefault();

        const validationErrors = validatePasswordForm(formData);
        
        if (validationErrors.oldPassword === "" && validationErrors.newPassword === "" && validationErrors.passwordVerification === "" ) {
            
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

    const validateDeleteForm = (data) => {
        const errors = {emailAddress: "", oldPassword: ""};
    
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!data.emailAddress) {
            errors.emailAddress = "Email address is required";
        } 
        else if (!(emailPattern.test(data.emailAddress))) {
            errors.emailAddress = "Please enter a valid email address";
        }

        if (!data.oldPassword) {
            errors.oldPassword = "Password is required";
        } else if (data.oldPassword.length < 8) {
            errors.oldPassword = "Password must be at least 8 characters long";
        }

        setFormValidationErrors(errors);
        return errors;
    }

    const handleDeleteUser = async (event) => {
        event.preventDefault();

        const validationErrors = validateDeleteForm(formData);
        
        if (validationErrors.emailAddress === "" && validationErrors.oldPassword === "") {

            try {
                console.log(formData);

                await api.delete("/users", {data: formData});
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

    const handleUsernameToggle = (event) => {
        event.preventDefault();
        setToggleUsername(prevState => !prevState);
        setTogglePassword(false);
        setToggleDelete(false);
    }

    const handlePasswordToggle = (event) => {
        event.preventDefault();
        setTogglePassword(prevState => !prevState);
        setToggleUsername(false);
        setToggleDelete(false);
    }

    const handleDeleteToggle = (event) => {
        event.preventDefault();
        setToggleDelete(prevState => !prevState);
        setToggleUsername(false);
        setTogglePassword(false);
    }


	return (
        <div>
            <NavBar />
        
            <main className="settings-container">
                <h2>Account Settings</h2>
                <div className="settings-grid">

                    <div className="button-box">
                        <button className="button-box-item" onClick={handleUsernameToggle}>
                            <label>User details</label>
                            <img src={"./arrow-right.png"} alt="arrow icon" />
                        </button>
                        <button className="button-box-item" onClick={handlePasswordToggle}>
                            <label>Password</label>
                            <img src={"./arrow-right.png"} alt="arrow icon" />
                        </button>
                        <button className="button-box-item" onClick={handleDeleteToggle}>
                            <label>Delete Account</label>
                            <img src={"./arrow-right.png"} alt="arrow icon" />
                        </button>
                    </div>

                    {toggleUsername &&
                    <div className="user-box"> 
                        <h3>Edit username and email address</h3>
                        <form onSubmit={handleEditUserDetails} noValidate>
                            
                            <label className="input-label">Username:</label>
                            {formValidationErrors.username !== "" ?
                            <div>
                            <input id="validation-error" type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.username}</p>
                            </div> :
                            <input type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleFormChange}
                                />
                            }

                            <label className="input-label">Email address:</label>
                            {formValidationErrors.emailAddress !== "" ?
                            <div>
                                <input id="validation-error" type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.emailAddress}</p>
                            </div> :
                            <input type="email" 
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormChange}
                            />
                            }
                            
                            <label className="input-label">Current password:</label>
                            {formValidationErrors.oldPassword !== "" ?
                            <div> 
                                <input id="validation-error" type="password" 
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.oldPassword}</p>
                            </div> :
                            <input type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                            }

                            {credentialsError !== "" && <p id="user-validation-error-message">{credentialsError}</p>}
                            <button>Save changes</button>
                        </form>
                    </div>}

                    {togglePassword &&
                    <div className="user-box">
                        <h3>Change password</h3>
                        <form onSubmit={handleEditUserPassword} noValidate>

                            <label className="input-label">Current password:</label>
                            {formValidationErrors.oldPassword !== "" ?
                            <div> 
                                <input id="validation-error" type="password" 
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.oldPassword}</p>
                            </div> :
                            <input type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                            }
                            
                            <label className="input-label">New password:</label>
                            {formValidationErrors.newPassword !== "" ?
                            <div> 
                                <input id="validation-error" type="password" 
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.newPassword}</p>
                            </div> :
                            <input type="password" 
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleFormChange}
                            />
                            }

                            <label className="input-label">Re-enter password:</label>
                            {formValidationErrors.passwordVerification !== "" ?
                            <div> 
                                <input id="validation-error" type="password" 
                                name="passwordVerification"
                                value={formData.passwordVerification}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.passwordVerification}</p>
                            </div> :
                            <input type="password" 
                            name="passwordVerification"
                            value={formData.passwordVerification}
                            onChange={handleFormChange}
                            />
                            }

                            {credentialsError !== "" && <p id="user-validation-error-message">{credentialsError}</p>}
                            <button>Save changes</button>
                        </form>
                    </div>}

                    {toggleDelete &&
                    <div className="user-box">
                        <h3>Permanently Delete Account</h3>
                        <form onSubmit={handleDeleteUser} noValidate>
                            <label className="input-label">Email address:</label>
                            {formValidationErrors.emailAddress !== "" ?
                            <div>
                                <input id="validation-error" type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.emailAddress}</p>
                            </div> :
                            <input type="email" 
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormChange}
                            />
                            }
                            
                            <label className="input-label">Current password:</label>
                            {formValidationErrors.oldPassword !== "" ?
                            <div> 
                                <input id="validation-error" type="password" 
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.oldPassword}</p>
                            </div> :
                            <input type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                            }

                            {credentialsError !== "" && <p id="user-validation-error-message">{credentialsError}</p>}
                            <button id="delete">Delete</button>
                        </form>
                    </div>}
                </div>
            </main>
        </div>
	)

}

export default Settings;