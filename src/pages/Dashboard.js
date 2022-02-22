import NavBar from "../components/Dashboard/Navbar";
import Objectives from "../components/Dashboard/Objectives";
import useAxios from "../utils/useAxios";
import { useState, useEffect } from "react";

const Dashboard = () => {

    const [objectives, setObjectives] = useState([]);

    const api = useAxios();

    useEffect( () => {
        getObjectives();
    }, []);

    const sortFunction = (a, b) => {
		const fa = a.title.toLowerCase();
		const fb = b.title.toLowerCase();
        const ia = a.importance;
        const ib = b.importance;
        if (ia < ib) return -1;
        else if (ia > ib) return 1;
        else if (ia === ib) {
            if (fa < fb) return -1;
            if (fa > fb) return 1;
        }
		else return 0;
	}

    const getObjectives = async () => {

        try {
            const response = await api.get("/objectives");
            const sortedResponse = response.data.sort(sortFunction);
			setObjectives(sortedResponse);
            
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