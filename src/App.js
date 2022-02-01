import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const fetchedAccessToken = window.localStorage.getItem("access_token");
    setAccessToken(fetchedAccessToken);
    const fetchedRefreshToken = window.localStorage.getItem("refresh_token");
    setRefreshToken(fetchedRefreshToken);
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <Login 
             setAccessToken={setAccessToken}
            setRefreshToken={setRefreshToken}/>
        }/>
        <Route path="/dashboard" element={
          <Dashboard 
            accessToken={accessToken}/>
        }/>
      </Routes>
    </BrowserRouter>

  );

}

export default App;
