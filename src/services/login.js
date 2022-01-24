import axios from 'axios';

const baseUrl = 'http://localhost:8080/login';

const loginService = props => {

	const payload = new URLSearchParams();
	payload.append('username', props.emailAddress);
	payload.append('password', props.password);

	try {
		axios.post(baseUrl, payload);
		props.setUsername('login');
	} catch (error) {
		console.log(`Error: ${error}`)
	}
	
	
}

export default loginService;