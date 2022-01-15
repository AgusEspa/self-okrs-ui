import { useState } from "react";
import Login from "./components/Login";
import loginService from "./services/login";
import NavBar from "./components/Navbar";
import Goals from "./components/Goals";

function App() {

  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      loginService(username, password);
      setEmailAddress('');
      setPassword('');
    } catch (exception) {}
  }

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className="App">
    
      {username === null ?
        <NavBar username={null} /> 
        :
        <NavBar username={username} />
      }

      {username === null &&
        <Login handleLogin={handleLogin}
              handleEmailAddress={handleEmailAddressChange}
              emailAddress={emailAddress}
              password={password}
              handlePassword={handlePasswordChange} />
      }
      
    </div>
  );
}

export default App;
