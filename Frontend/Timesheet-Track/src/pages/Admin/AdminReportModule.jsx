import React from "react";

const AdminReportModule = () => {
  return (
    <div className="report-container">
      {/* Filter Section */}
      <div className="filter-section">
        <h2>Admin Timesheet Report</h2>
        <div className="filters">
          <select>
            <option>All Employees</option>
          </select>
          <select>
            <option>All Projects</option>
          </select>
          <select>
            <option>All Statuses</option>
          </select>
          <input type="date" />
          <input type="date" />
          <button className="export-btn">Export PDF</button>
          <button className="export-btn">Download CSV</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <p>Total Logged Hours</p>
          <h3>326 hrs</h3>
        </div>
        <div className="card">
          <p>Total Projects</p>
          <h3>12</h3>
        </div>
        <div className="card">
          <p>Total Employees</p>
          <h3>45</h3>
        </div>
        <div className="card">
          <p>Task Completion</p>
          <h3>72%</h3>
        </div>
      </div>

      {/* Chart Placeholders */}
      <div className="charts">
        <div className="chart-box">[Pie Chart: Project Time Distribution]</div>
        <div className="chart-box">[Bar Chart: Hours per Employee]</div>
        <div className="chart-box">[Line Chart: Daily Log Trend]</div>
        <div className="chart-box">[Donut Chart: Task Status]</div>
      </div>

      {/* Project Summary Table */}
      <div className="table-section">
        <h3>Project Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Total Hours</th>
              <th>Employees</th>
              <th>Tasks</th>
              <th>Completion %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web Revamp</td>
              <td>120</td>
              <td>6</td>
              <td>15</td>
              <td>85%</td>
            </tr>
            {/* More rows here */}
          </tbody>
        </table>
      </div>

      {/* Employee Summary Table */}
      <div className="table-section">
        <h3>Employee Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Project</th>
              <th>Logged Hours</th>
              <th>Approved</th>
              <th>Rejected</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>EMP203</td>
              <td>Mobile UI</td>
              <td>35</td>
              <td>30</td>
              <td>2</td>
              <td>3</td>
            </tr>
            {/* More rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportModule;

/* =================== CSS Styling =================== */
const styles = document.createElement("style");
styles.innerHTML = `
.report-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f7f9fc;
}

.filter-section h2 {
  margin-bottom: 10px;
  color: #333;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filters select,
.filters input[type="date"],
.filters button {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.export-btn {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.export-btn:hover {
  background-color: #0056b3;
}

.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 200px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.card p {
  margin: 0;
  color: #777;
}

.card h3 {
  margin: 10px 0 0;
  font-size: 24px;
  color: #222;
}

.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-box {
  background: #ffffff;
  border-radius: 10px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.table-section {
  margin-top: 30px;
}

.table-section h3 {
  margin-bottom: 10px;
  color: #444;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f0f0f0;
  font-weight: 600;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
`;
document.head.appendChild(styles);
