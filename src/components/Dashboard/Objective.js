import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import KeyResult from "./KeyResult";

const Objective = (props) => {

	const [ name, setName ] = useState(props.name);
	const [ importance, setImportance ] = useState(props.importance);
	const [ keyResults, setKeyResults] = useState([]);
	const [ keyResultName, setKeyResultName ] = useState('');
	const [ keyResultDueDate, setKeyResultDueDate ] =useState('');

	const api = useAxios();

	useEffect( () => {
        getKeyResults();
    }, []);

	const getKeyResults = async () => {

		const params = new URLSearchParams({ objectiveId: props.id });

        try {
            const response = await api.get(`/objectives/keyresults?${params}`);
			setKeyResults(response.data);
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
    }

	const handleDelete = async () => {
		
		try {
            await api.delete(`/objectives/${props.id}`);
			
			props.setObjectives(prevState => ( prevState.filter(objective => objective.id !== props.id)));
            
        } catch (error) {
            console.log(`Request failed: ${error}`);
		}

	}

	const handleEdit = async (event) => {

		event.preventDefault();
		const body = {
			name: name,
			importance: importance
		}
		
		try {
            const response = await api.put(`/objectives/${props.id}`, body);
			
			props.setObjectives(prevState => ( 
				prevState.filter(objective => objective.id !== props.id)
					.concat(response.data)));

        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}

	}

	const handleNewKeyResult = async (event) => {

		event.preventDefault();
		const body = {
			name: keyResultName,
			objectiveId: props.id,
			dueDate: keyResultDueDate
		}

		try {
            const response = await api.post("/objectives/keyresults", body);
			
			setKeyResults(prevState => prevState.concat(response.data));

			setKeyResultName('');
			setKeyResultDueDate('');
            
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

	const handleKeyResultNameChange = (event) => {
		setKeyResultName(event.target.value);
	}

	const handleKeyResultDueDateChange = (event) => {
		setKeyResultDueDate(event.target.value);
	}

	const mappedKeyResults = keyResults.map( keyResult => 
		<KeyResult 
			key={keyResult.id}
			id={keyResult.id}
			name={keyResult.name}
			dueDate={keyResult.dueDate}
			setKeyResults={setKeyResults}
		/>
	);

	return (
		<div>
			<h2>{props.title}</h2>
			<p>Importance: {props.importance}</p>

			<h3>Key Results:</h3>
			<ul>{mappedKeyResults}</ul>
			<div>
				<form onSubmit={handleNewKeyResult}>
					<div>
						<input type="text" placeholder="Name"
						value={keyResultName}
						onChange={handleKeyResultNameChange}
						/>
					</div>
					<div>
						<input type="text" placeholder="yyyy-mm-dd"
						value={keyResultDueDate}
						onChange={handleKeyResultDueDateChange}
						/>
					</div>
					<button type="submit">New Key result</button>
				</form>
			</div>

			<button onClick={handleDelete}>Delete</button>
			<div>
				<form onSubmit={handleEdit}>
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
					<button type="submit">Edit</button>
				</form>
			</div>
		</div>
	)
}

export default Objective;
