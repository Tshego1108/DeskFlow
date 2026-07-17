import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
// Forgot/Reset pages removed
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      {/* Registration disabled - system uses seeded users */}
      {/* Forgot/Reset password pages removed per request */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/employee" element={<ProtectedRoute role="Employee"><EmployeeDashboard/></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role="Admin"><AdminDashboard/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
