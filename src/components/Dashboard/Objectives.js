import useAxios from "../../utils/useAxios";
import { useState } from "react";
import Objective from "./Objective";

const Objectives = (props) => {

	const [ createObjectiveFormData, setCreateObjectiveFormData ] = useState( {
		title: "", 
		importance: "" } 
	);

	const api = useAxios();

	const handleCreateObjective = async (event) => {

		event.preventDefault();

		try {
            const response = await api.post("/objectives", createObjectiveFormData);
			
			props.setObjectives(props.objectives.concat(response.data));

			setCreateObjectiveFormData({title: "", importance: ""});
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
	}

	const handleCreateObjectiveFormChange = (event) => {
		const { name, value } = event.target;
		setCreateObjectiveFormData( prevState => ( {
			...prevState,
			[name]: value
		}));
	}

	const mappedObjectives = props.objectives.map( objective => 
		<Objective 
			key={objective.id}
			id={objective.id}
			title={objective.title}
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
						<input type="text" 
						placeholder="Title"
						name="title"
						value={createObjectiveFormData.title}
						onChange={handleCreateObjectiveFormChange}
						/>
					</div>
					<div>
						<input type="number" 
						placeholder="Importance (1 to 5)"
						name="importance"
						value={createObjectiveFormData.importance}
						onChange={handleCreateObjectiveFormChange}
						/>
					</div>
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
}

export default Objectives;