import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);
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
			
			<div>
				<button className="nav-toggle" onClick={handleResponsiveNavToggle}>...</button>
				<div className={responsiveNavDisplay ? "links-menu active" : "links-menu"}>
					<ul>
						<li>
							<Link to="/dashboard"><span>Dashboard</span></Link>
						</li>
						<li className="dropdown">
							<span>{userAuth.username}</span>
							<UserMenu logout={logout} />
						</li>
					</ul>
				</div>
			</div>

    	</nav>
	);
}

export default NavBar;