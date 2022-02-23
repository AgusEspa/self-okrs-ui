import { Link } from "react-router-dom";

const UserMenu = (props) => {

	return(
		<div className="dropdown-menu-container">
			<div className="dropdown-menu-box">
				<ul className="dropdown-menu">
					<li>
						<Link to="/settings"><span>Settings</span></Link>
					</li>
					<li>
						<button onClick={props.logout}><span>Logout</span></button>
					</li>
				</ul>
			</div>
		</div>

	);

}

export default UserMenu;