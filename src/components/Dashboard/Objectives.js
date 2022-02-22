import useAxios from "../../utils/useAxios";
import Objective from "./Objective";
import ToolBar from "./Toolbar";


const Objectives = (props) => {

	const api = useAxios();

	const handleCreateObjective = async () => {

		const newObjectiveTemplate = {
			title: "Title", 
			importance: "5" }

		try {
            const response = await api.post("/objectives", newObjectiveTemplate);
			
			props.setObjectives(props.objectives.concat(response.data));
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
	}

	const mappedObjectives = props.objectives.map(objective => 
		<Objective 
			key={objective.id}
			id={objective.id}
			title={objective.title}
			importance={objective.importance}
			setObjectives={props.setObjectives}
		/>);			


	return (
		<div>
			<ToolBar 
				handleCreateObjective={handleCreateObjective}
			/>
			<div className="objectives-container">
				{mappedObjectives}
			</div>
		</div>
	);
}

export default Objectives;