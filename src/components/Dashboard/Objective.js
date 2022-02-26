import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import KeyResult from "./KeyResult";

const Objective = (props) => {

	const [ keyResults, setKeyResults ] = useState([]);

	const [ editObjectiveFormData, setEditObjectiveFormData ] = useState( () => ({
		title: props.title, 
		importance: props.importance } 
	));

	const [ objectiveIsChanged, setObjectiveIsChanged ] = useState(false);

	const [ toggledKeyResultView, setToggledKeyResultView ] = useState(false);
	
	const api = useAxios();

	useEffect( () => {
        getKeyResults();
    }, []);

	const getKeyResults = async () => {

        try {
            const response = await api.get(`/objectives/${props.id}/keyresults`);
			
			const parsedResponse = response.data.map(item => {
				if (item.dueDate === null) {
					return {...item, dueDate: ""}
				} else return item;
			});
			
			setKeyResults(parsedResponse);
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
    }


	const handleEditObjectiveFormChange = (event) => {

		setObjectiveIsChanged(true);

		const { name, value } = event.target;

		setEditObjectiveFormData( prevState => ( {
			...prevState,
			[name]: value
		}));
	}

	const handleEditObjective = async (event) => {

		event.preventDefault();
		
		try {
            const response = await api.put(`/objectives/${props.id}`, editObjectiveFormData);
			
			props.setObjectives(prevState => ( 
				prevState.filter(objective => objective.id !== props.id)
					.concat(response.data)));

			setObjectiveIsChanged(false);

        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}

	}

	const handleDeleteObjective = async () => {
		
		try {
            await api.delete(`/objectives/${props.id}`);
			
			props.setObjectives(prevState => ( prevState.filter(objective => objective.id !== props.id)));
            
        } catch (error) {
            console.log(`Request failed: ${error}`);
		}

	}

	const handleToggleKeyResultView = () => {
		setToggledKeyResultView(prevState => !prevState);
	}

	const handleCreateKeyResult = async () => {
		const newKeyResultTemplate = {
			title: "Title", 
			dueDate: "",
			isDone: false }

		try {
            const response = await api.post(`/objectives/${props.id}/keyresults`, newKeyResultTemplate);
			
			setKeyResults(prevState => prevState.concat(response.data));
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
	}

	const mappedKeyResults = keyResults.map( keyResult => 
		<KeyResult 
			key={keyResult.id}
			id={keyResult.id}
			objectiveId={props.id}
			title={keyResult.title}
			dueDate={keyResult.dueDate}
			isDone={keyResult.isDone}
			setKeyResults={setKeyResults}
		/>
	);

	return (
		<div className="objective-box">
			<div>
				<form onSubmit={handleEditObjective}>
					<textarea className="objective-title" 
						type="text" 
						placeholder="Title"
						name="title"
						value={editObjectiveFormData.title}
						onChange={handleEditObjectiveFormChange}
					/>
					<div>
					<label className="objective-card-label">Importance: </label>
						<input className="input-number"
							type="number" 
							placeholder="Importance (1 to 5)"
							name="importance"
							value={editObjectiveFormData.importance}
							min="1" max="5"
							onChange={handleEditObjectiveFormChange}
							/>
					</div>	
					{objectiveIsChanged && <button className="save-changes">Save changes</button>}
				</form>
			</div>

			<div>
				<h3 className="objective-card-subtitle">Key Results: {keyResults.length}</h3>
				<button onClick={handleToggleKeyResultView}>{toggledKeyResultView ? "hide" : "show"}</button>
				{toggledKeyResultView && (
					<div>
						<ul className="key-results-list">{mappedKeyResults}</ul>
						<button onClick={handleCreateKeyResult}>Add key result</button>
					</div>)
				}
			</div>

			<button onClick={handleDeleteObjective}>Delete objective</button>
		</div>
	)
}

export default Objective;
