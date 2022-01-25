import Login from "./Login";
import About from "./About";

const Home = (props) => {
   
    return (
        <div className="home">
            <div className="body-container">
                <About />
            </div>
            <div className="login-container">
                <Login 
                    setAccessToken={props.setAccessToken}
                    setRefreshToken={props.setRefreshToken}/>
            </div>
        </div>
    )
}
 
export default Home;