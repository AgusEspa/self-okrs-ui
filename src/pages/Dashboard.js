import NavBar from "../components/Dashboard/Navbar";
import Goals from "../components/Dashboard/Goals";
import useAxios from "../utils/useAxios";
import { useState, useEffect } from "react";

const Dashboard = () => {

    const [goals, setGoals] = useState([]);

    const api = useAxios();

    useEffect( () => {
        getGoals();
    }, []);

    const getGoals = async () => {

        try {
            const response = await api.get("/goals");
			setGoals(response.data);
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
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