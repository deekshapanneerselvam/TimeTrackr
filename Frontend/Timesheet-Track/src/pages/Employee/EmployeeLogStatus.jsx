import React, { useEffect, useState } from 'react';

const EmployeeTimeLogStatus = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/timesheets`);
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching time logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Employee Time Log Status</h2>

      {loading ? (
        <p>Loading time logs...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Date</th>
                <th className="text-left py-2 px-4 border-b">Project</th>
                <th className="text-left py-2 px-4 border-b">Task</th>
                <th className="text-left py-2 px-4 border-b">Description</th>
                <th className="text-left py-2 px-4 border-b">Start Time</th>
                <th className="text-left py-2 px-4 border-b">End Time</th>
                <th className="text-left py-2 px-4 border-b">Duration (hh:mm)</th>
                <th className="text-left py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b"> {new Date(log.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{log.project_id}</td>
                    <td className="py-2 px-4 border-b">{log.task}</td>
                    <td className="py-2 px-4 border-b">{log.description || '—'}</td>
                    <td className="py-2 px-4 border-b">{log.start_time}</td>
                    <td className="py-2 px-4 border-b">{log.end_time}</td>
                    <td className="py-2 px-4 border-b">{log.duration}</td>
                    <td className="py-2 px-4 border-b">{log.status || 'Pending'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No time logs available.
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

export default EmployeeTimeLogStatus;
