import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Dashboard from './components/Dashboard/Dashboard';

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
      <Home 
        setAccessToken={setAccessToken}
        setRefreshToken={setRefreshToken}
        /> 
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
