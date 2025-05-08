// src/pages/Dashboard/ManagerDashboard.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ManagerSidebar from '../../components/Manager/ManagerSidebar';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <ManagerSidebar />

      <div style={styles.contentSection}>
        <header style={styles.topbar}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </header>

        <main style={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
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
