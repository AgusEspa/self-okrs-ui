import NavBar from "./Navbar";

const Dashboard = (props) => {
   
    return (
        <div>
            <div >
				<NavBar 
                    username={props.username} 
                />
            </div>
        </div>
    )
}
 
export default Dashboard;