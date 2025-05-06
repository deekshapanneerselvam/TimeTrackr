// src/pages/Dashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaUserTie, FaTasks, FaFileAlt, FaUserCircle } from 'react-icons/fa';
import EmployeeManagement from '../Admin/EmployeeManagement';
import ProjectManagement from '../Admin/ProjectManagement';
import TaskManagement from './TaskManagement'; // Import TaskManagement

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('timesheet');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'timesheet':
        return <h2>📊 Timesheet Overview</h2>;
      case 'employees':
        return <EmployeeManagement />;  {/* Display Employee Management component here */}
      case 'project':
        return <ProjectManagement />;
      case 'tasks':
        return <TaskManagement />; {/* Display TaskManagement component here */}
      case 'reports':
        return <h2>📄 Reports</h2>;
      case 'profile':
        return <h2>👤 Admin Profile</h2>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Optionally clear auth tokens here
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>⏱ TimeTrackr</h1>
        <nav>
          <SidebarItem icon={<FaClock />} label="Timesheet" tab="timesheet" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FaUserTie />} label="Employees" tab="employees" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FaUserCircle />} label="Project" tab="project" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FaTasks />} label="Tasks" tab="tasks" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FaFileAlt />} label="Reports" tab="reports" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FaUserCircle />} label="Profile" tab="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>
      </aside>

      {/* Main Section */}
      <div style={styles.contentSection}>
        {/* Top Bar */}
        <header style={styles.topbar}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </header>

        {/* Main Content */}
        <main style={styles.mainContent}>
          {renderContent()}
          <p style={{ marginTop: 10, color: '#6b7280' }}>This is the {activeTab} section.</p>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, tab, activeTab, setActiveTab }) => {
  const isActive = activeTab === tab;
  return (
    <div
      onClick={() => setActiveTab(tab)}
      style={{
        ...styles.sidebarItem,
        backgroundColor: isActive ? '#eef2ff' : 'transparent',
        color: isActive ? '#4338ca' : '#374151',
      }}
    >
      <span style={styles.icon}>{icon}</span>
      {label}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRight: '1px solid #e5e7eb',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#4338ca',
    marginBottom: '30px',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'all 0.2s ease-in-out',
  },
  icon: {
    marginRight: '12px',
    fontSize: '16px',
  },
  contentSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  topbar: {
    height: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 30px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
  },
  logoutButton: {
    backgroundColor: '#4338ca',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f3f4f6',
  },
};

export default AdminDashboard;
