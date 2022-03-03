
const Notification = (props) => {

	if (props.type === "error") {
		return (
			<div className="error-notification">
				<p>{props.message}</p>
			</div>
		)
	} else if (props.type === "ok") {
		return (
			<div className="success-notification">
				<p>{props.message}</p>
			</div>
		)
	}
	
}

export default Notification;