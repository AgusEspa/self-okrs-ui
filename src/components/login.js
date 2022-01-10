import React from 'react';

const Login = (props) => {

	return (
		<div>
			<h3>Login:</h3>
		
			<form onSubmit={props.handleLogin}>
				<div>username
					<input type="text"
					value={props.username}
					name="Username"
					onChange={({ target }) => props.setUsername(target.value)}
					/>
				</div>
				<div>password
					<input type="text"
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