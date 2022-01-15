import { useHistory } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ uri, auth }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  const history = useHistory();

  const cancel = () => {
    const l = history.length;
    l > 2 ? history.goBack() : history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await auth.loginUser({
      username,
      password,
    });
    if (res && res.success) {
      setErrMsg(null);
      history.push(uri ? uri : "/");
    } else {
      setErrMsg(
        res && typeof res === "string" ? res : "Invalid Username/Password"
      );
    }
  };

	return (
		<div className="login">
			<h3>Login</h3>
		
			<form onSubmit={props.handleLogin}>
				<div>
					<input type="text" placeholder="Email address"
					value={props.emailAddress}
					onChange={props.handleEmailAddress}
					/>
				</div>
				<div> 
					<input type="text" placeholder="Password"
					value={props.password}
					onChange={props.handlePassword}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

}

Login.propTypes = {
	auth: PropTypes.object.isRequired,
};

export default Login;