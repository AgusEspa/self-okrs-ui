import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = (props) => {

	const { userAuth, logout } = useContext(AuthContext);

	return (
		<nav className="navbar">
      		
			<div className="logo-box">
        		<img src={"./logo.png"} alt="self.OKRs logo"/> 
      		</div>
			  
			<div className="links-menu">
			  	<ul>
					<li><button onClick={logout}>
						<span className="links-menu-item">{userAuth.username}</span>
					</button></li>
				</ul>
				</div>
			
    	</nav>
	);
}

export default NavBar;