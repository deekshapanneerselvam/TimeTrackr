// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard';
import EmployeeManagement from './pages/Admin/EmployeeManagement';
import ProjectManagement from './pages/Admin/ProjectManagement';
import ProjectDetails from './pages/Admin/Projects/ProjectDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="project" element={<ProjectManagement />} />
          <Route path="project/:projectId" element={<ProjectDetails />} />
          {/*<Route path="timesheet" element={<Timesheet />} />
          
          
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />*/}
        </Route>

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        
      </Routes>
    </Router>
  );
}
