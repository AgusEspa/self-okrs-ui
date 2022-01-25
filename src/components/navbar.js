import { Link } from "react-router-dom";

const NavBar = (props) => {
	return (
		<nav className="navbar">
      		<div className="app-title"><h3>Self.OKRs</h3></div>
			  
			{props.username !== '' ?
      			<div className="links-menu">
			  	<ul>
				  	<li><Link className="links-menu-item" to="/#">Goals</Link></li>
					<li><Link className="links-menu-item" to="/#">Key Results</Link></li>
					<li><span>{props.username}</span></li>
				</ul>
				</div> 
				:
				<div className="links-menu">
			  	<ul>
					<li><Link className="links-menu-item" to="/#">About</Link></li>
					<li><Link className="links-menu-item" to="/login">Login</Link></li>
				</ul>
				</div>
			}
			
    	</nav>
	);
}

export default NavBar;