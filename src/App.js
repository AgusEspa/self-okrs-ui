import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const [username, setUsername] = useState('Username');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  
  if (accessToken === '' || accessToken === null || accessToken === undefined) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={
            <Home 
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}/> 
          }/>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/dash" element={
            <Dashboard 
              username={username}/>
          }/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
