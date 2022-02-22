
const ToolBar = (props) => {

	return (
		<div className="toolbar">
      					  
			<div className="tools-menu">	
			  	<ul>
				  	
				  	<li>
					  	<form>
							<input type="search" 
								placeholder="search" 
							/>
							<button>🔍</button>
						</form>
					</li>

					<li>
						<button onClick={props.handleCreateObjective}><span className="tools-menu-item">New Objective</span></button>
					</li>
				 
				</ul>
			</div>
			
    	</div>
	);

}

export default ToolBar;