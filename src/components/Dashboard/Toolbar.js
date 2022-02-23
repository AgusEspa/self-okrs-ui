import { useState } from "react";

const ToolBar = (props) => {

	const [searchTerm, setSearchTerm] = useState("");
	const [searchIsOn, setSearchIsOn] = useState(false);

	const handleSearchTermChange = (event) => {
		setSearchTerm(event.target.value);
	}

	const handleSubmitSearch = (event) => {
		event.preventDefault();
		setSearchIsOn(true);
	}

	const handleClearSearch = (event) => {
		event.preventDefault();
		setSearchIsOn(false);
		setSearchTerm("");
	}

	return (
		<div className="toolbar">
      					  
			<div className="tools-menu">	
			  	<ul>
				  	
				  	<li>
					  	<form onSubmit={handleSubmitSearch}>
							<input type="search" 
								placeholder="search"
								name="searchTerm"
								value={searchTerm} 
								onChange={handleSearchTermChange}
							/>
							{searchIsOn ? <button type="button" onClick={handleClearSearch}>X</button> : <button type="submit">S</button>}
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