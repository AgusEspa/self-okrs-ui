import { useState } from "react";
import Login from "./components/login";
import loginService from "./services/login";
import axios from 'axios'
const baseUrl = '/api/login'

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
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
