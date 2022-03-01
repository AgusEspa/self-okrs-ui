import NavBar from "../components/Dashboard/Navbar/Navbar";
import Objectives from "../components/Dashboard/Objectives";
import useAxios from "../utils/useAxios";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";

const Dashboard = () => {

    const [objectives, setObjectives] = useState([]);
	const { setUserAuth, logout } = useContext(AuthContext);

    const api = useAxios();

    useEffect( () => {
		getCredentials();
    }, []);

	const getCredentials = async () => {

        try {
            const response = await api.get("/users/authenticated");
			
            setUserAuth( prevState => ({
                ...prevState,
                username: response.data.username,
                emailAddress: response.data.emailAddress,}
            ));
            
        } catch (error) {
            if (!error.response) {
                console.log("Unable to contact the server. Try again later.");
            } else {
                logout();
            }
        }
    };

    useEffect( () => {
        getObjectives();
    }, []);

    const getObjectives = async () => {

        try {
            const response = await api.get("/objectives");
			setObjectives(response.data);
            
        } catch (error) {
            if (!error.response) {
                console.log("Unable to contact the server. Try again later.");
            } else {
                console.log(error.response.data);
            }
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