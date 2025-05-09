import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

const AdminAnalysis = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/timesheets/analysis');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Loading analytics...</p>;

  const employeeData = analytics.totalHoursByEmployee.map((e) => ({
    name: `Emp ${e._id.slice(-4)}`,
    hours: e.totalDuration,
  }));

  const projectData = analytics.hoursByProject.map((p) => ({
    name: `Proj ${p._id.slice(-4)}`,
    hours: p.totalDuration,
  }));

  const dailyData = analytics.dailyTrends.map((d) => ({
    date: d._id,
    hours: d.totalDuration,
  }));

  const statusData = analytics.statusSummary.map((s, index) => ({
    name: s._id || 'Unknown',
    value: s.count,
    fill: COLORS[index % COLORS.length],
  }));

  const topEmployees = analytics.topEmployees.map((e) => ({
    name: `Emp ${e._id.slice(-4)}`,
    hours: e.totalDuration,
  }));

  

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Admin Analytics Dashboard</h2>

      <div style={styles.chartGrid}>
        <div style={styles.chartBox}>
          <h3>Total Hours by Employee</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employeeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3>Hours by Project</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3>Daily Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3>Status Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3>Top 5 Employees</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topEmployees}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* New: Breakdown by Project and Employee */}
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f3f4f6',
  },
  header: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '24px',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '30px',
  },
  chartBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
};

export default AdminAnalysis;
