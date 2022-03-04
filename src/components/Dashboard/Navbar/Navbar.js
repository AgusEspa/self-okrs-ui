import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);
	const [userMenuDisplay, setUserMenuDisplay] = useState(false);
	const [responsiveNavDisplay, setResponsiveNavDisplay] = useState(false);

	const handleResponsiveNavToggle = (event) => {
		event.preventDefault();
		setResponsiveNavDisplay(prevState => !prevState);
	}
	

	return (
		<nav className="navbar">
      		<div className="nav-logo-box">
				<img className="nav-logo" src={"./logo.png"} alt="self.OKRs logo"/> 
			</div>
			  
			<div className="links-menu">
			  	<ul>
				  	<li>
					  	<Link to="/dashboard"><span>Dashboard</span></Link>
					</li>
					<li
						onMouseEnter={() => setUserMenuDisplay(true)}
        				onMouseLeave={() => setUserMenuDisplay(false)}>
						<span>{userAuth.username}</span>
						{userMenuDisplay && <UserMenu logout={logout} />}
					</li>
				</ul>
			</div>

			<div className="responsive-links-menu">
				<button onClick={handleResponsiveNavToggle}>X</button>
				{responsiveNavDisplay &&
			  	<ul>
				  	<li>
					  	<Link to="/dashboard"><span>Dashboard</span></Link>
						<span>{userAuth.username}</span>
						<ul>
							<li>
							<Link to="/settings"><span>Settings</span></Link>
							</li>
							<li>
							<button onClick={props.logout}><span>Logout</span></button>
							</li>
						</ul>
					</li>
				</ul>}
			</div>
			
    	</nav>
	);
}

export default NavBar;