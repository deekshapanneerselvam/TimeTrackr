// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Auth/Login';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard';
import EmployeeManagement from './pages/Admin/EmployeeManagement';
import ProjectManagement from './pages/Admin/ProjectManagement';
import ProjectDetails from './pages/Admin/Projects/ProjectDetails';
import Timesheet from './pages/Employee/Timesheet';
import EmployeeProjects from './pages/Employee/EmployeeProjects';
import EmployeeTimeLogStatus from './pages/Employee/EmployeeLogStatus';
import ManagerTimeLogOverview from './pages/Manager/ManagerTimesheet';
import ManagerTimeLogApproval from './pages/Manager/ManagerTimeLogApproval';
import AdminAnalysis from './pages/Admin/AdminAnalysis';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />}>

          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="analysis" element={<AdminAnalysis />} />
          <Route path="project" element={<ProjectManagement />} />
          <Route path="project/:projectId" element={<ProjectDetails />} />
          <Route path="timesheet" element={<ManagerTimeLogOverview />} />
          
          {/*<Route path="timesheet" element={<Timesheet />} />
          
          
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />*/}
        </Route>

        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="project" element={<EmployeeProjects/>} />
          <Route path="status" element={<EmployeeTimeLogStatus/>} />
            
        </Route>
        
        <Route path="/manager" element={<ManagerDashboard />}>
          <Route path="team-timesheet" element={<ManagerTimeLogOverview />} />
          <Route path="approve-timesheet" element={<ManagerTimeLogApproval />} />
        </Route>
        
      </Routes>
    </Router>
  );
}
