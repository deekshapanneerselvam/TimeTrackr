// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}
