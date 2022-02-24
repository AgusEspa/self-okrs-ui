import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);
	const [userMenuDisplay, setUserMenuDisplay] = useState(true);

	return (
		<nav className="navbar">
      		
			<div className="logo-box">
        		<img src={"./logo.png"} alt="self.OKRs logo"/> 
      		</div>
			  
			<div className="links-menu">
			  	<ul>
				  	<li>
					  	<Link to="/dashboard"><span>Dashboard</span></Link>
					</li>
					<li
						onMouseEnter={() => setUserMenuDisplay(true)}
        				onMouseLeave={() => setUserMenuDisplay(false)}>
						<div>{userAuth.username}</div>
						{userMenuDisplay && <UserMenu logout={logout} />}
					</li>
				</ul>
				</div>
			
    	</nav>
	);
}

export default NavBar;