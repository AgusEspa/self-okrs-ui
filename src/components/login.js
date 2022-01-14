const Login = (props) => {

	return (
		<div className="login">
			<h3>Login</h3>
		
			<form onSubmit={props.handleLogin}>
				<div>
					<input type="text" placeholder="Email address"
					value={props.emailAddress}
					name="Username"
					onChange={({ target }) => props.setUsername(target.value)}
					/>
				</div>
				<div> 
					<input type="text" placeholder="Password"
					value={props.password}
					name="Password"
					onChange={({ target }) => props.setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

}

export default Login;