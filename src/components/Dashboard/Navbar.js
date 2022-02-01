import axios from 'axios';
import { useState, useEffect } from "react";

const NavBar = (props) => {

	//const [username, setUsername] = useState('');

	const baseUrl = 'http://localhost:8080';

	// useEffect(() => {
	// 	const config = { headers: { Authorization: `Bearer ${props.accessToken}` } };
	// 	axios.get(`${baseUrl}/api/users/authenticated`, config)
	// 		.then(response => {
	// 			setUsername(response.data.username);
	// 		});
    // }, [props.accessToken]);

	const handleGoalsClic = () => {
		props.setGoals(getGoals(props.accessToken));
	}

	const getGoals = (currentAccessToken) => {
		const config = { headers: { 'Authorization': `Bearer ${currentAccessToken}` } };

		axios.get(`${baseUrl}/api/goals`, config)
			.then(response => { return response.data })
			.catch(error => { console.log('There was an error!', error) }
		);
	}


	return (
		<nav className="navbar">
      		
			<div className="app-title"><h3>Self.OKRs</h3></div>
			  
			<div className="links-menu">
			  	<ul>
				  	<li><button onClick={handleGoalsClic}>
					  	<span className="links-menu-item">Goals</span>
					</button></li>
					<li><button>
						<span className="links-menu-item">Key Results</span>
					</button></li>
					<li><button>
						<span className="links-menu-item">{props.username}</span>
					</button></li>
				</ul>
				</div>
			
    	</nav>
	);
}

export default NavBar;