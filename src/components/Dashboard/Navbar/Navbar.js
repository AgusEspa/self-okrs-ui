import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import UserMenu from "./UserMenu";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);
	const [userMenuDisplay, setUserMenuDisplay] = useState(false);

	const handleUserMenuDisplayChange = (event) => {
		event.preventDefault();
		setUserMenuDisplay(prevState => !prevState);
	}

	return (
		<nav className="navbar">
      		
			<div className="logo-box">
        		<img src={"./logo.png"} alt="self.OKRs logo"/> 
      		</div>
			  
			<div className="links-menu">
			  	<ul>
					<li><button onClick={handleUserMenuDisplayChange}>
						<span className="links-menu-item">{userAuth.username}</span>
						</button>
						{userMenuDisplay && <UserMenu logout={logout} />}
					</li>
				</ul>
				</div>
			
    	</nav>
	);
}

export default NavBar;