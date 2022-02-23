import NavBar from "../components/Dashboard/Navbar/Navbar";
import Objectives from "../components/Dashboard/Objectives";
import useAxios from "../utils/useAxios";
import { useState, useEffect } from "react";

const Dashboard = () => {

    const [objectives, setObjectives] = useState([]);

    const api = useAxios();

    useEffect( () => {
        getObjectives();
    }, []);


    const getObjectives = async () => {

        try {
            const response = await api.get("/objectives");
			setObjectives(response.data);
            
        } catch (error) {
            console.log(`Request failed: ${error.response.data.error_message}`);
		}
    };

    return (
        <div>
			<NavBar />
            <Objectives 
                objectives={objectives}
                setObjectives={setObjectives}
            />
        </div>
    )
}
 
export default Dashboard;