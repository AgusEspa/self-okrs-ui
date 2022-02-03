//import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);

	const handleGoalsClic = () => {
		props.setGoals(getGoals(props.accessToken));
	}

	const getGoals = () => {
		// const config = { headers: { 'Authorization': `Bearer ${currentAccessToken}` } };

		// axios.get(`${baseUrl}/api/goals`, config)
		// 	.then(response => { return response.data })
		// 	.catch(error => { console.log('There was an error!', error) }
		// );
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
						<span className="links-menu-item">{userAuth.username}</span>
					</button></li>
					<li><button onClick={logout}>Logout</button></li>
				</ul>
				</div>
			
    	</nav>
	);
}

export default NavBar;