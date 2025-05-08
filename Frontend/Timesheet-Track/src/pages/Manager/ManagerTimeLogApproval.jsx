import React, { useEffect, useState } from 'react';

const ManagerTimeLogApproval = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/timelogs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching time logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const updateStatus = async (logId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/timelogs/${logId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchLogs(); // Refresh after status change
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Approve Employee Timesheets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Employee</th>
                <th className="text-left py-2 px-4 border-b">Date</th>
                <th className="text-left py-2 px-4 border-b">Project</th>
                <th className="text-left py-2 px-4 border-b">Task</th>
                <th className="text-left py-2 px-4 border-b">Duration</th>
                <th className="text-left py-2 px-4 border-b">Status</th>
                <th className="text-left py-2 px-4 border-b">Actions</th>
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
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => updateStatus(log._id, 'Approved')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(log._id, 'Rejected')}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No timesheets available.
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

export default ManagerTimeLogApproval;
