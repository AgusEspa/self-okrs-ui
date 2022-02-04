import NavBar from "../components/Dashboard/Navbar";
import Goals from "../components/Dashboard/Goals";
import useRefreshToken from "../utils/useRefreshToken";
import { useState, useEffect } from "react";

const Dashboard = () => {

    const [goals, setGoals] = useState([]);

    const api = useRefreshToken();

    useEffect( () => {
        getGoals();
    }, []);

    const getGoals = async () => {

        try {
            const response = await api.get("/goals");
			setGoals(response.data);
            
        } catch (error) {
			console.log(`${error}`);
		}
    };


    return (
        <div>
			<NavBar 
                handleGetGoals={getGoals}
            />
            <Goals 
                goals={goals}
            />

        </div>
    )
}
 
export default Dashboard;