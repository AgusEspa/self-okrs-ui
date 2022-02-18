import useAxios from "../../utils/useAxios";
import { useState } from "react";

const KeyResult = (props) => {

	const api = useAxios();

	const [ editKeyResultFormData, setEditKeyResultFormData ] = useState( () => ({
		title: props.title,
		dueDate: props.dueDate,
		isDone: props.isDone }
	));

	const [ keyResultIsChanged, setKeyResultIsChanged ] = useState(false);

	const handleDelete = async () => {
		
		try {
            await api.delete(`/objectives/keyresults/${props.id}`);
			
			props.setKeyResults(prevState => ( prevState.filter(KeyResult => KeyResult.id !== props.id)));
            
        } catch (error) {
            console.log(`Request failed: ${error}`);
		}

	}

	const handleEditKeyResultFormChange = (event) => {
		setKeyResultIsChanged(true);
		const { name, value, type, checked } = event.target;
		setEditKeyResultFormData( prevState => ( {
			...prevState,
			[name]: type === "checkbox" ? checked : value
		}));
	}

	const handleEditKeyResult = async (event) => {

		event.preventDefault();

		try {
			const response = await api.put(`/objectives/${props.objectiveId}/keyresults/${props.id}`, editKeyResultFormData);
				
			props.setKeyResults(prevState => ( 
				prevState.filter(keyResult => keyResult.id !== props.id)
					.concat(response.data)));

			setKeyResultIsChanged(false);
				
		} catch (error) {
			console.log(`Request failed: ${error.response.data.error_message}`);
		
		}
	}

	return (
		<li className="key-result-item">
			<form onSubmit={handleEditKeyResult}>
				<input type="checkbox"
					name="isDone"
					checked={editKeyResultFormData.isDone}
					onChange={handleEditKeyResultFormChange}
				/>
				<input type="text" 
					name="title"
					value={editKeyResultFormData.title}
					onChange={handleEditKeyResultFormChange}
				/> 

				{props.dueDate !== "" ? <p>{props.dueDate}</p> : <button>add due date</button>}
				<input type="date" 
					name="dueDate"
					value={editKeyResultFormData.dueDate}
					onChange={handleEditKeyResultFormChange}
				/>

				{keyResultIsChanged && <button className="save-changes">Save changes</button>}

			</form>
			
			<button onClick={handleDelete}>Delete</button>
		</li>
	)

}

export default KeyResult;