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
  
  if (accessToken === '' || accessToken === null || accessToken === undefined) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Home 
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}/>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <Dashboard 
        accessToken={accessToken}
      />
    );
  }
}

export default App;
