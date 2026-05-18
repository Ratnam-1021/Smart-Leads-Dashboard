import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './store/authStore';

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Welcome />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
