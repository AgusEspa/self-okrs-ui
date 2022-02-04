import NavBar from "../components/Dashboard/Navbar";
import Goals from "../components/Dashboard/Goals";
import useRefreshToken from "../utils/useRefreshToken";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

    const { userAuth } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);

    const baseUrl = 'http://localhost:8080';

    const api = useRefreshToken();

    useEffect( () => {
        getGoals();
    }, []);

    const getGoals = async () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${userAuth.accessToken}`
            }
        }

        try {
            const response = await api.get(`${baseUrl}/api/goals`, config);
			setGoals(response.data);
            
        } catch (e) {
			console.log(`Error: ${e}`);
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