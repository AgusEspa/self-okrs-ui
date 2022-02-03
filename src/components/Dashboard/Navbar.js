//import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);

	return (
		<nav className="navbar">
      		
			<div className="app-title"><h3>Self.OKRs</h3></div>
			  
			<div className="links-menu">
			  	<ul>
				  	<li><button onClick={props.handleGetGoals}>
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