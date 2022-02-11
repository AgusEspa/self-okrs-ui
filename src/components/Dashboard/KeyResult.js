import useAxios from "../../utils/useAxios";
import { useState } from "react";

const KeyResult = (props) => {

	const api = useAxios();

	const [ keyResultName, setKeyResultName ] = useState(props.name);
	const [ keyResultDueDate, setKeyResultDueDate ] = useState(props.dueDate);

	const handleDelete = async () => {
		
		try {
            await api.delete(`/objectives/keyresults/${props.id}`);
			
			props.setKeyResults(prevState => ( prevState.filter(KeyResult => KeyResult.id !== props.id)));
            
        } catch (error) {
            console.log(`Request failed: ${error}`);
		}

	}

	const handleKeyResultNameChange = (event) => {
		setKeyResultName(event.target.value);
	}

	const handleKeyResultDueDateChange = (event) => {
		setKeyResultDueDate(event.target.value);
	}

	const handleEditKeyResult = async (event) => {

		event.preventDefault();
			
		const body = {
			name: keyResultName,
			objectiveId: props.id,
			dueDate: keyResultDueDate
		}

		try {
			const response = await api.put(`/objectives/keyresults/${props.id}`, body);
				
			props.setKeyResults(prevState => ( 
				prevState.filter(keyResult => keyResult.id !== props.id)
					.concat(response.data)));
				
		} catch (error) {
			console.log(`Request failed: ${error.response.data.error_message}`);
		
		}
	}

	return (
		<li>
			<p>{props.name}</p>
			<div>
				<form onSubmit={handleEditKeyResult}>
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
					<button type="submit">Edit</button>
				</form>
			</div>
			<button onClick={handleDelete}>Delete</button>
		</li>
	)

}

export default KeyResult;