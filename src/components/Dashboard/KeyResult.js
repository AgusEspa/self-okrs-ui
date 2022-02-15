import useAxios from "../../utils/useAxios";
import { useState } from "react";

const KeyResult = (props) => {

	const api = useAxios();

	const [ editKeyResultFormData, setEditKeyResultFormData ] = useState( {
		title: props.title,
		dueDate: props.dueDate,
		isDone: props.isDone }
	);

	const handleDelete = async () => {
		
		try {
            await api.delete(`/objectives/keyresults/${props.id}`);
			
			props.setKeyResults(prevState => ( prevState.filter(KeyResult => KeyResult.id !== props.id)));
            
        } catch (error) {
            console.log(`Request failed: ${error}`);
		}

	}

	const handleEditKeyResultFormChange = (event) => {
		const { name, value, type, checked } = event.target;
		setEditKeyResultFormData( prevState => ( {
			...prevState,
			[name]: type === "checkbox" ? checked : value
		}));
	}

	const handleCheckbox = (event) => {
		event.preventDefault();
		const { name, checked } = event.target;
		setEditKeyResultFormData( prevState => ( {
			...prevState,
			[name]: checked
		}));
		handleEditKeyResult(event);

	}

	const handleEditKeyResult = async (event) => {

		event.preventDefault();

		try {
			const response = await api.put(`/objectives/${props.objectiveId}/keyresults/${props.id}`, editKeyResultFormData);
				
			props.setKeyResults(prevState => ( 
				prevState.filter(keyResult => keyResult.id !== props.id)
					.concat(response.data)));
				
		} catch (error) {
			console.log(`Request failed: ${error.response.data.error_message}`);
		
		}
	}

	return (
		<li>
			<div>
				<input type="checkbox"
					name="isDone"
					checked={editKeyResultFormData.isDone}
					onChange={handleCheckbox}
				/>
				<p>{props.title}</p>
				{props.dueDate !== "" && <p>{props.dueDate}</p>}
			</div>
			
			<div>
				<form onSubmit={handleEditKeyResult}>
					<div>
						<input type="text" 
						placeholder="Name"
						name="title"
						value={editKeyResultFormData.title}
						onChange={handleEditKeyResultFormChange}
						/>
					</div>
					<div>
						<input type="date" 
						name="dueDate"
						value={editKeyResultFormData.dueDate}
						onChange={handleEditKeyResultFormChange}
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