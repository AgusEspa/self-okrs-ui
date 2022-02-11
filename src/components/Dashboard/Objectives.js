import useAxios from "../../utils/useAxios";
import { useState } from "react";
import Objective from "./Objective";

const Objectives = (props) => {

	const [ name, setName ] = useState('');
	const [ importance, setImportance ] = useState('');

	const api = useAxios();

	const handleCreateObjective = async (event) => {

		event.preventDefault();
		
		const body = {
			name: name,
			importance: importance
		}

		try {
            const response = await api.post("/objectives", body);
			
			props.setObjectives(props.objectives.concat(response.data));

			setName('');
			setImportance('');
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
	}

	const handleNameChange = (event) => {
		setName(event.target.value);
	}

	const handleImportanceChange = (event) => {
		setImportance(event.target.value);
	}

	const mappedObjectives = props.objectives.map( objective => 
		<Objective 
			key={objective.id}
			id={objective.id}
			name={objective.name}
			importance={objective.importance}
			setObjectives={props.setObjectives}
		/>
	);

	return (
		<div>
			<div>{mappedObjectives}</div>
			<div>
				<form onSubmit={handleCreateObjective}>
					<h3>Create Objective</h3>
					<div>
						<input type="text" placeholder="Name"
						value={name}
						onChange={handleNameChange}
						/>
					</div>
					<div>
						<input type="number" placeholder="Importance (1 to 5)"
						value={importance}
						onChange={handleImportanceChange}
						/>
					</div>
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
}

export default Objectives;