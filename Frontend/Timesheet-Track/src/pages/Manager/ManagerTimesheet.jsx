import React, { useEffect, useState } from 'react';

const ManagerTimeLogOverview = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllLogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/timelogs'); // Replace with your endpoint
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching all time logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLogs();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">All Employees Time Logs</h2>

      {loading ? (
        <p>Loading time logs...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Employee</th>
                <th className="text-left py-2 px-4 border-b">Date</th>
                <th className="text-left py-2 px-4 border-b">Project</th>
                <th className="text-left py-2 px-4 border-b">Task</th>
                <th className="text-left py-2 px-4 border-b">Description</th>
                <th className="text-left py-2 px-4 border-b">Start Time</th>
                <th className="text-left py-2 px-4 border-b">End Time</th>
                <th className="text-left py-2 px-4 border-b">Duration</th>
                <th className="text-left py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{log.employee_name || log.employee_email}</td>
                    <td className="py-2 px-4 border-b">{log.date}</td>
                    <td className="py-2 px-4 border-b">{log.project_name}</td>
                    <td className="py-2 px-4 border-b">{log.task_name}</td>
                    <td className="py-2 px-4 border-b">{log.description || '—'}</td>
                    <td className="py-2 px-4 border-b">{log.start_time}</td>
                    <td className="py-2 px-4 border-b">{log.end_time}</td>
                    <td className="py-2 px-4 border-b">{log.duration}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          log.status === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'Rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {log.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No logs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagerTimeLogOverview;
