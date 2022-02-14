import { Link } from "react-router-dom";

const Header = () => {

	return (
		<header>
			<div className="logo-box">
        		<img src={"./logo.png"} alt="self.OKRs logo"/> 
      		</div>
			<Link to="/login">Login</Link>
		</header>
	);	
}

export default Header;