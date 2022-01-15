import axios from 'axios';

const baseUrl = 'http://localhost:8080/login';

const loginService = props => {

	const payload = new URLSearchParams();
	payload.append('username', props.username);
	payload.append('password', props.password);

	axios.post(baseUrl, payload);
	
}

export default loginService;