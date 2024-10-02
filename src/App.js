import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login';
import Logout from './pages/Logout'; // Import the new Logout
import AdminPayments from './pages/AdminPayments';
import Payments from './pages/Payments';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ element: Component }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/authorize', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Unauthorized');
      })
      .then(() => {
        setIsAuthorized(true);
      })
      .catch(() => {
        setIsAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/app/login" />;
  }

  return <Component />;
};

function MainApp() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/app">Home</Link></li>
            <li><Link to="/app/dashboard">Dashboard</Link></li>
            <li><Link to="/app/payments">Payments</Link></li>
            <li><Link to="/app/login">Login</Link></li>
            <li><Link to="/app/logout">Logout</Link></li>
            <li><Link to="/app/admin">Admin</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/app/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/app/payments" element={<ProtectedRoute element={Payments} />} />
          <Route path="/app/login" element={<Login />} />
          <Route path="/app/logout" element={<Logout />} />
          <Route path="/app/admin" element={<ProtectedRoute element={AdminPayments} />} />
          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainApp;
