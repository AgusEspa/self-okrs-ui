import NavBar from "../components/Dashboard/Navbar/Navbar";
import Objectives from "../components/Dashboard/Objectives";
import useAxios from "../utils/useAxios";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";

const Dashboard = () => {

    const [objectives, setObjectives] = useState([]);
	const { setUserAuth, logout } = useContext(AuthContext);
    const [notification, setNotification] = useState("");

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
                setNotification("Unable to contact the server. Please try again later.");
                await new Promise(resolve => setTimeout(resolve, 5000));
                setNotification("");
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
                setNotification("Unable to contact the server. Please try again later.");
                await new Promise(resolve => setTimeout(resolve, 5000));
                setNotification("");
            } else {
                console.log(error.response.data);
            }
        }
    };

    return (
        <div>
			<NavBar />
            <main>
                <Objectives 
                    objectives={objectives}
                    setObjectives={setObjectives}
                    setNotification={setNotification}
                />
            </main>
            
            {(notification !== "") &&
            <div className="notification">
                <p>{notification}</p>
            </div>}
        </div>
    )
}
 
export default Dashboard;