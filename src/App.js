import { useState } from "react";
import Login from "./components/Login";
import NavBar from "./components/Navbar";

function App() {

  const [username, setUsername] = useState(null);
  const token = sessionStorage.getItem("access_token");

  return (
    <div className="App">
    
      {token === null ?
        <NavBar username={null} /> 
        :
        <NavBar username={username} />
      }

      {token === null &&
        <Login 
              setUsername={setUsername}
              />
      }
      
    </div>
  );
}

export default App;
