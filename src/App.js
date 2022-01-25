import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const [username, setUsername] = useState('');
  const token = sessionStorage.getItem("access_token");

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
