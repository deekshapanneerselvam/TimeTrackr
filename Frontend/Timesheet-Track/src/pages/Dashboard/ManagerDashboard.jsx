// src/pages/Dashboard/ManagerDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaCheckCircle, FaFileAlt, FaUserCircle } from 'react-icons/fa';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('teamTimesheet');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'teamTimesheet':
        return <h2>🧑‍🤝‍🧑 View Team Timesheet</h2>;
      case 'approveTimesheet':
        return <h2>✅ Approve Submitted Timesheets</h2>;
      case 'reports':
        return <h2>📄 Reports Overview</h2>;
      case 'profile':
        return <h2>👤 Manager Profile</h2>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>⏱ TimeTrackr</h1>
        <nav>
          <SidebarItem icon={<FaClock />} label="Team Timesheet" tab="teamTimesheet" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FaCheckCircle />} label="Approve Timesheet" tab="approveTimesheet" activeTab={activeTab} setActiveTab={setActiveTab} />
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

export default ManagerDashboard;
