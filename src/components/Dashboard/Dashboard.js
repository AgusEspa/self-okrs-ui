import NavBar from "../Navbar";

const Dashboard = (props) => {
   
    return (
        <div>
            <div >
				<NavBar 
                    username={props.username} 
                    token={props.token}
                />
            </div>
        </div>
    )
}
 
export default Dashboard;