import { Link } from "react-router-dom";

const Header = () => {

	return (
		<header className="header-container">
			<div className="header-logo-box">
        		<img className="header-logo" src={"./logo.png"} alt="self.OKRs logo"/> 
      		</div>
			<div className="get-started-link">
				<Link to="/login">Get started!</Link>
			</div>
			
		</header>
	);	
}

export default Header;