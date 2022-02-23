import { Link } from "react-router-dom";

const UserMenu = (props) => {


	return(
		<div>
			<ul>
				<li>
					<Link to="/settings">Settings</Link>
				</li>
				<li>
					<button onClick={props.logout}>
						<span className="links-menu-item">logout</span>
					</button>
				</li>
			</ul>
			
		</div>

	);

}

export default UserMenu;