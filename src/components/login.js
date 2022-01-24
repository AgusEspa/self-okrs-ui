import loginService from "../services/login";

const Login = (props) => {

  const handleLogin = (event) => {
    event.preventDefault();
    loginService(props.emailAddress, props.password, props.setUsername);
    props.setEmailAddress('');
    props.setPassword('');
  }

  const handleEmailAddressChange = (event) => {
    props.setEmailAddress(event.target.value);
  }
  const handlePasswordChange = (event) => {
    props.setPassword(event.target.value);
  }

	return (
		<div className="login">
			<h3>Login</h3>
		
			<form onSubmit={handleLogin}>
				<div>
					<input type="text" placeholder="Email address"
					value={props.emailAddress}
					onChange={handleEmailAddressChange}
					/>
				</div>
				<div> 
					<input type="text" placeholder="Password"
					value={props.password}
					onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

}

export default Login;