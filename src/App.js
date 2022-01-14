import { useState } from "react";
import Login from "./components/login";
import login from "./services/login";
import NavBar from "./components/navbar";
import Goals from "./components/goals";

function App() {

  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      const user = login({emailAddress, password});
      setUser(user);
      setEmailAddress('');
      setPassword('');
    } catch (exception) {}
  }

  const testingUsername = "Username";

  return (
    <div className="App">
    
      <NavBar username={user.username} />

      {user === null &&
        <Login handleLogin={handleLogin}
              emailAddress={emailAddress}
              setEmailAddress={setEmailAddress}
              password={password}
              setPassword={setPassword} />
      }
      

    </div>
  );
}

export default App;
