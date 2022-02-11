import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);

	return (
		<nav className="navbar">
      		
			<div className="app-title"><h3>Self.OKRs</h3></div>
			  
			<div className="links-menu">
			  	<ul>
				  	<li><button onClick={props.handleGetObjectives}>
					  	<span className="links-menu-item">Objectives</span>
					</button></li>
					
					<li><button onClick={logout}>
						<span className="links-menu-item">{userAuth.username}</span>
					</button></li>
				</ul>
				</div>
			
    	</nav>
	);
}

export default NavBar;