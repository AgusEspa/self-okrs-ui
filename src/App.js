import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const [username, setUsername] = useState('Username');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" index element={
          <Home 
            token={accessToken}
            username={username}
          />} 
        />
        <Route path="/login" element={
          <Login 
            setAccessToken={setAccessToken}
            setRefreshToken={setRefreshToken}
          />} 
        />
        <Route path="/dash" element={
          <Dashboard 
            token={accessToken}
            username={username}
          />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
