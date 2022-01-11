import NavItem from "./navitem";

const NavBar = (props) => {
	return (
		<nav className="navbar">
      		<div className="app-title">Self.OKRs</div>
      		<div className="links-menu">
			  	<ul>
					<NavItem title={"Goals"} />
					<NavItem title={props.username} />
				</ul>
			</div>
    	</nav>
	);
}

export default NavBar;