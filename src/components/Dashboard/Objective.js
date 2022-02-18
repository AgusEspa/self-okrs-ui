import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import KeyResult from "./KeyResult";

const Objective = (props) => {

	const [ editObjectiveFormData, setEditObjectiveFormData ] = useState( () => ({
		title: props.title, 
		importance: props.importance } 
	));

	const [ objectiveIsChanged, setObjectiveIsChanged ] = useState(false);

	const [ keyResults, setKeyResults ] = useState([]);

	const [ createKeyResultFormData, setCreateKeyResultFormData ] = useState( {
		title: "",
		dueDate: ""}
	);
	
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

	const handleCreateKeyResultFormChange = (event) => {

		const { name, value } = event.target;
		
		setCreateKeyResultFormData( prevState => ( {
			...prevState,
			[name]: value
		}));
	}

	const handleCreateKeyResult = async (event) => {

		event.preventDefault();

		try {
            const response = await api.post(`/objectives/${props.id}/keyresults`, createKeyResultFormData);
			
			setKeyResults(prevState => prevState.concat(response.data));

			setCreateKeyResultFormData({title: "", dueDate: ""});
            
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
			<form onSubmit={handleEditObjective}>
				<div>
					<textarea className="objective-title" rows="4" cols="15"
					type="text" 
					placeholder="Title"
					name="title"
					value={editObjectiveFormData.title}
					onChange={handleEditObjectiveFormChange}
					/>
				</div>
				<div>
					<span className="objective-card-subtitle">Importance: </span>
					<input className="input-number"
					type="number" 
					placeholder="Importance (1 to 5)"
					name="importance"
					value={editObjectiveFormData.importance}
					min="1" max="5"
					onChange={handleEditObjectiveFormChange}
					/>
				</div>
				{objectiveIsChanged && <button>Save changes</button>}
			</form>
			
			<span className="objective-card-subtitle">Key Results:</span>
			<ul>{mappedKeyResults}</ul>
			<div>
				<form onSubmit={handleCreateKeyResult}>
					<div>
						<input type="text" 
						placeholder="Name"
						name="title"
						value={createKeyResultFormData.title}
						onChange={handleCreateKeyResultFormChange}
						/>
					</div>
				
					<div>
						<input type="date" 
						name="dueDate"
						value={createKeyResultFormData.dueDate}
						onChange={handleCreateKeyResultFormChange}
						/>
					</div>
					<button>New Key result</button>
				</form>
			</div>

		<button onClick={handleDeleteObjective}>Delete</button>

		</div>

	)
}

export default Objective;
