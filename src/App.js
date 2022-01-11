import { useState } from "react";
import Login from "./components/login";
import login from "./services/login";
import NavBar from "./components/navbar"

function App() {

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   try {
  //     const user = login({username, password});
  //     setUser(user);
  //     setUsername('');
  //     setPassword('');
  //   } catch (exception) {}
  // }

  const testingUsername = "Username";

  return (
    <div className="App">
    
      <NavBar username={testingUsername} />

    </div>
  );
}

export default App;
