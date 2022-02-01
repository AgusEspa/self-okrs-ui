import NavBar from "../components/Dashboard/Navbar";
import Goals from "../components/Dashboard/Goals";
import { useState } from "react";

const Dashboard = (props) => {

    const [goals, setGoals] = useState(null);

    return (
        <div>
			<NavBar 
                setGoals={setGoals}
                accessToken={props.accessToken}
            />
            <Goals 
                goals={goals}
            />

        </div>
    )
}
 
export default Dashboard;