import { useState } from "react";
import Login from "./components/login";
import login from "./services/login";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      const user = await login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="App">
      <Login 
        handler={handleLogin}
        setUsername={setUsername}
        username={username}
        setPassword={setPassword}
        password={password}
      />
    </div>
  );
}

export default App;
