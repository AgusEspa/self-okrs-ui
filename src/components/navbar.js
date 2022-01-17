import NavItem from "./Navitem";

const NavBar = (props) => {
	return (
		<nav className="navbar">
      		<div className="app-title"><h3>Self.OKRs</h3></div>
			  
			{props.username !== null ?
      			<div className="links-menu">
			  	<ul>
					<NavItem title={"About"} />
					<NavItem title={"Goals"} />
					<NavItem title={props.username} />
				</ul>
				</div> 
				:
				<div className="links-menu">
			  	<ul>
					<NavItem title={"About"} />
				</ul>
				</div>
			}
			
    	</nav>
	);
}

export default NavBar;