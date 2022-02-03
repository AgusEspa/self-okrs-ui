import NavBar from "../components/Dashboard/Navbar";
import Goals from "../components/Dashboard/Goals";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

    const { userAuth, checkTokenValidity, updateToken } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);

    const baseUrl = 'http://localhost:8080';

    useEffect( () => {
        handleGetGoals();
    }, []);

    async function handleGetGoals() {
        const isTokenValid = checkTokenValidity();
        
        if (isTokenValid !== true) {
            await updateToken();
            getGoals();
        } else getGoals();        
    }

    async function getGoals () {

        try {
            
			const config = {
				headers: {
					'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`
				}
			}
			const response = await axios.get(`${baseUrl}/api/goals`, config);
			setGoals(response.data);
            
        } catch (e) {
			console.log(`Error: ${e}`);
		}
    };


    return (
        <div>
			<NavBar 
                handleGetGoals={handleGetGoals}
            />
            <Goals 
                goals={goals}
            />

        </div>
    )
}
 
export default Dashboard;