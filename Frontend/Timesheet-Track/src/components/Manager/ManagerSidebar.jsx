// src/components/ManagerSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCheckCircle, FaChartBar, FaUserCircle, FaClock } from 'react-icons/fa';

const ManagerSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <FaUsers />, label: 'Team Timesheet', path: '/manager/team-timesheet' },
    { icon: <FaCheckCircle />, label: 'Approve Timesheet', path: '/manager/approve-timesheet' },
    { icon: <FaChartBar />, label: 'View Report', path: '/manager/view-report' },

  ];

  return (
    <aside style={styles.sidebar}>
      <h1 style={styles.logo}>⏱ Manager </h1>
      <nav>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path} style={{ textDecoration: 'none' }}>
            <div
              style={{
                ...styles.sidebarItem,
                backgroundColor: location.pathname === item.path ? '#eef2ff' : 'transparent',
                color: location.pathname === item.path ? '#4338ca' : '#374151',
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRight: '1px solid #e5e7eb',
    height: '100vh',
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
};

export default ManagerSidebar;
