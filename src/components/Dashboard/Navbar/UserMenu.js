
const UserMenu = (props) => {

	return(
		<div>
			<ul>
				<li><button onClick={props.logout}>
						<span className="links-menu-item">logout</span>
					</button></li>
			</ul>
			
		</div>

	);

}

export default UserMenu;