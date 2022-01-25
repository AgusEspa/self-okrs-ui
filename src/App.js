import { useState } from "react";
import Login from "./components/Login";
import NavBar from "./components/Navbar";

function App() {

  const [username, setUsername] = useState('');
  const token = sessionStorage.getItem("access_token");

  return (
    <div className="App">
    
      {(token === null || token === undefined) ?
        <NavBar username={null} /> 
        :
        <NavBar username={"username"} />
      }

      {(token === null || token === undefined) &&
        <Login 
              setUsername={setUsername}
        />
      }
      
    </div>
  );
}

export default App;
