import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/"
                        element={
                            <PublicRoute><Home /></PublicRoute>}
                    />

                    <Route path="/dashboard"
                        element={
                            <ProtectedRoute><Dashboard /></ProtectedRoute>}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;