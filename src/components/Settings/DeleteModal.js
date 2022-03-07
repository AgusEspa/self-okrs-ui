import styles from "../../styles/Modals.module.scss";

const DeleteModal = (props) => {

	const handleCancelButton = () => {
		props.setModalIsOpen(false)
	}

	return (
		<>
		<div className="modal-backdrop" onClick={() => props.setModalIsOpen(false)} />
		<div className="modal-container">
			<div className="delete-modal-box">
				<div>
					<h3>Are you sure you want to delete your account?</h3>
					<p>All your data will be permanently lost.</p>
				</div>
				<div className="delete-modal-button-container">
					<button type="submit" id="delete">Delete</button>
					<button type="button" onClick={handleCancelButton}>Cancel</button>
				</div>
			</div>
		</div>
		</>
	)
}

export default DeleteModal;