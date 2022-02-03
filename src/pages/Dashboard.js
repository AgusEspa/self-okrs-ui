import NavBar from "../components/Dashboard/Navbar";
import Goals from "../components/Dashboard/Goals";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {

    const { userAuth, updateToken } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);

    const baseUrl = 'http://localhost:8080';

    useEffect( () => {
        getGoals();
    }, []);

    const getGoals = async () => {
        try {
			const config = {
				headers: {
					'Authorization': `Bearer ${userAuth.accessToken}`
				}
			}
			const response = await axios.get(`${baseUrl}/api/goals`, config);
        
			setGoals(response.data);
            
        } catch (e) {
			console.log(`Error: ${e}`);
		}
    }

    return (
        <div>
			<NavBar 
                setGoals={setGoals}
            />
            <Goals 
                goals={goals}
            />

        </div>
    )
}
 
export default Dashboard;