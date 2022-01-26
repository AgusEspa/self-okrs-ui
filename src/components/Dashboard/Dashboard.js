import NavBar from "./Navbar";
import Goals from "./Goals";
import { useState, useEffect } from "react";

const Dashboard = (props) => {

    const [username, setUsername] = useState('Username');

    useEffect(() => {
        setUsername(userService(props.accessToken))
      }, [props.accessToken]);

    const userService = (currentAccessToken) => {
        // axios get request

    }

    return (
        <div>
			<NavBar 
                username={username} 
            />
            <Goals />

        </div>
    )
}
 
export default Dashboard;