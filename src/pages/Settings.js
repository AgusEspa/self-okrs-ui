import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import NavBar from "../components/Dashboard/Navbar/Navbar";
import Notification from "../components/Dashboard/Notification";

const Settings = () => {

    const { userAuth, setUserAuth, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({username: userAuth.username, emailAddress: userAuth.emailAddress, oldPassword: "", newPassword: "", passwordVerification: ""});
    const [credentialsError, setCredentialsError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [formValidationErrors, setFormValidationErrors] = useState({username: "", emailAddress: "", oldPassword: "", newPassword: "", passwordVerification: ""});
    const [toggleUsername, setToggleUsername] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [networkError, setNetworkError] = useState("");


	const api = useAxios();

    useEffect( () => {
		getCredentials();
    }, []);

	const getCredentials = async () => {

        try {
            const response = await api.get("/users/authenticated");
			
            setUserAuth( prevState => ({
                ...prevState,
                username: response.data.username,
                emailAddress: response.data.emailAddress}
            ));
            
        } catch (error) {
            if (!error.response || error.response.status >= 500) {
                setNetworkError("Unable to contact the server. Please try again later.");
                await new Promise(resolve => setTimeout(resolve, 5000));
                setNetworkError("");
            } else {
                logout();
            }
        }
    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value 
        }));
    }

    const validateDetailsForm = (data) => {
        const errors = {username:"", emailAddress: "", oldPassword: ""};
        setFormValidationErrors(errors);
    
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

        setCredentialsError("");

        const validationErrors = validateDetailsForm(formData);
        
        if (validationErrors.emailAddress === "" && validationErrors.username === "" && validationErrors.oldPassword === "") {

            setIsLoading(true);
            
            try {
                await api.put("/users", formData);
                setIsLoading(false);

                logout();

            } catch (error) {
                setIsLoading(false);

                if (!error.response || error.response.status >= 500) {
                    setNetworkError("Unable to contact the server. Please try again later.");
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    setNetworkError("");
                } else if (error.response.status) {
                    if (error.response.data.includes("mail"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        emailAddress: error.response.data 
                    }));
                    if (error.response.data.includes("password"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        oldPassword: error.response.data
                    }));
                } else setCredentialsError(error.response.data);     
            }
        }
    }

    const validatePasswordForm = (data) => {
        const errors = {oldPassword: "", newPassword: "", passwordVerification: ""};

        setFormValidationErrors(errors);
    
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

        setCredentialsError("");

        const validationErrors = validatePasswordForm(formData);
        
        if (validationErrors.oldPassword === "" && validationErrors.newPassword === "" && validationErrors.passwordVerification === "" ) {

            setIsLoading(true);
            
            try {
                await api.put("/users", formData);
                setIsLoading(false);
                logout();

            } catch (error) {
                setIsLoading(false);

                if (!error.response || error.response.status >= 500) {
                    setNetworkError("Unable to contact the server. Please try again later.");
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    setNetworkError("");
                } else if (error.response.status) {
                    if (error.response.data.includes("mail"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        emailAddress: error.response.data 
                    }));
                    if (error.response.data.includes("password"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        oldPassword: error.response.data
                    }));
                } else setCredentialsError(error.response.data);     
            }
        }
        
    }

    const validateDeleteForm = (data) => {
        const errors = {emailAddress: "", oldPassword: ""};

        setFormValidationErrors(errors);
        
        if (!data.emailAddress) {
            errors.emailAddress = "Email address is required";
        } 
        else if (data.emailAddress !== userAuth.emailAddress) {
            errors.emailAddress = "Please enter this account's email address";
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

        setCredentialsError("");

        const validationErrors = validateDeleteForm(formData);
        
        if (validationErrors.emailAddress === "" && validationErrors.oldPassword === "") {

            setIsLoading(true);

            try {
                await api.delete("/users", {data: formData});
                setIsLoading(false);
                logout();
            } catch (error) {
                setIsLoading(false);
                if (!error.response || error.response.status >= 500) {
                    setNetworkError("Unable to contact the server. Please try again later.");
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    setNetworkError("");
                } else if (error.response.status) {
                    if (error.response.data.includes("mail"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        emailAddress: error.response.data 
                    }));
                    if (error.response.data.includes("password"))
                    setFormValidationErrors( prevState => ({
                        ...prevState,
                        oldPassword: error.response.data
                    }));
                } else setCredentialsError(error.response.data);     
            }
            
        }
    }

    const handleUsernameToggle = (event) => {
        event.preventDefault();
        setToggleUsername(prevState => !prevState);
        setFormData( prevState => ({
            ...prevState,
            username: userAuth.username,
            emailAddress: userAuth.emailAddress}
        ));
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
        setFormData( prevState => ({
            ...prevState,
            emailAddress: ""}
        ));
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
                            <label id="delete-label">Delete Account</label>
                            <img src={"./arrow-right.png"} alt="arrow icon" />
                        </button>
                    </div>

                    {toggleUsername &&
                    <div className="user-box"> 
                        <h3>Edit username and email address</h3>
                        <form onSubmit={handleEditUserDetails} noValidate>
                            
                            <label className="input-label">New username:</label>
                            {formValidationErrors.username !== "" ?
                            <div>
                            <input autoComplete="new-password" id="validation-error" type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.username}</p>
                            </div> :
                            <input autoComplete="new-password" type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleFormChange}
                                />
                            }

                            <label className="input-label">New email address:</label>
                            {formValidationErrors.emailAddress !== "" ?
                            <div>
                                <input autoComplete="new-password" id="validation-error" type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.emailAddress}</p>
                            </div> :
                            <input autoComplete="new-password" type="email" 
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormChange}
                            />
                            }
                            
                            <label className="input-label">Current password:</label>
                            {formValidationErrors.oldPassword !== "" ?
                            <div> 
                                <input autoComplete="new-password" id="validation-error" type="password" 
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleFormChange}
                                />
                                <p id="user-validation-error-message">{formValidationErrors.oldPassword}</p>
                            </div> :
                            <input autoComplete="new-password" type="password" 
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleFormChange}
                            />
                            }

                            {credentialsError !== "" && <p id="user-validation-error-message">{credentialsError}</p>}
                            <button>Save changes</button>

                            {isLoading &&
                            <div className="loading-spinner-container">
                                <div className="loading-spinner"></div>
                            </div>
                            }
                        </form>
                    </div>}

                    {togglePassword &&
                    <div className="user-box">
                        <h3>Change password</h3>
                        <form onSubmit={handleEditUserPassword} autoComplete="off" noValidate>

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

                            {isLoading &&
                            <div className="loading-spinner-container">
                                <div className="loading-spinner"></div>
                            </div>
                            }
                        </form>
                    </div>}

                    {toggleDelete &&
                    <div className="user-box">
                        <h3 id="delete-title">Permanently Delete Your Account</h3>
                        <form onSubmit={handleDeleteUser} autoComplete="off" noValidate>
                            <label className="input-label">Type yor email address to confirm:</label>
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
                                <input id="validation-error" autoComplete="new-password" type="password" 
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

                            {isLoading &&
                            <div className="loading-spinner-container">
                                <div className="loading-spinner"></div>
                            </div>
                            }
                        </form>
                    </div>}
                </div>
            </main>
            {(networkError !== "") &&
            <Notification 
                message={networkError} 
                type={"error"}
            />}
        </div>
	)

}

export default Settings;