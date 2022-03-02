
const Notification = (props) => {

	if (props.type === "error") {
		return (
			<div className="error-notification">
				<p>{props.message}</p>
			</div>
		)
	}
	
}

export default Notification;