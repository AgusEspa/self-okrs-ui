import qs from "qs";
import axios from 'axios';

const baseUrl = 'http://localhost:8080/login';

const loginService = (props) => {
	const credentials = new URLSearchParams();
	credentials.append('username', props.emailAddress);
	credentials.append('password', props.password);

	const config = {
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	
	console.log(qs.stringify(credentials));

	axios.post(baseUrl, qs.stringify(credentials), config)
  	.then((result) => {
    	props.setUsername('login')
  	})
  	.catch((error) => {
    	console.log(`Error: ${error}`)
  	})
}

export default loginService;