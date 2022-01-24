import { useState } from "react";
import Login from "./components/Login";
import NavBar from "./components/Navbar";

function App() {

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(null);

  return (
    <div className="App">
    
      {username === null ?
        <NavBar username={null} /> 
        :
        <NavBar username={username} />
      }

      {username === null &&
        <Login
              emailAddress={emailAddress}
              setEmailAddress={setEmailAddress}
              password={password}
              setPassword={setPassword} 
              setUsername={setUsername}
              />
      }
      
    </div>
  );
}

export default App;
