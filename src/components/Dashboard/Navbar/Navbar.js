import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);
	const [userMenuDisplay, setUserMenuDisplay] = useState(false);

	return (
		<nav className="navbar">
      		
			<img className="logo-box" src={"./logo.png"} alt="self.OKRs logo"/> 
			  
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
			
    	</nav>
	);
}

export default NavBar;