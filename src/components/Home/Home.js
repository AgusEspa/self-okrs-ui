import NavBar from "../Navbar";

const Home = (props) => {
   
    return (
        <div>
            <div >
                <NavBar 
                    username={props.username} 
                    token={props.token}
                />
            </div>
        </div>
    )
}
 
export default Home;