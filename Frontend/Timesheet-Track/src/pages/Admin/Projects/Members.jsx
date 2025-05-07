import React, { useState, useEffect } from 'react';

const Members = ({ project }) => {
  const { project_id: projectId, project_name: projectName } = project;
  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assignedEmployees, setAssignedEmployees] = useState([]); // Track assigned employees

  // Fetch employees when the dialog is opened
  useEffect(() => {
    if (openDialog) {
      const fetchEmployees = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:5000/api/employee');
          const data = await response.json();
          setEmployees(data);
        } catch (err) {
          console.error('Error fetching employees:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployees();
    }
  }, [openDialog]);

  // Assign the current project to an employee
  const assignProjectToEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employee/${employeeId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, projectName }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Project assigned successfully');
        setAssignedEmployees((prev) => [...prev, employeeId]); // Mark as assigned
      } else {
        console.error('Failed to assign project');
      }
    } catch (err) {
      console.error('Error assigning project:', err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search members..."
          className="border rounded px-4 py-2 w-1/2"
        />
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Assign User
        </button>
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Assign Member to Project</h2>

            {loading ? (
              <p>Loading employees...</p>
            ) : (
              <ul className="space-y-4">
                {employees.length > 0 ? (
                  employees.map((employee) => {
                    const isAssigned = assignedEmployees.includes(employee.employee_id);
                    return (
                      <li key={employee.employee_id} className="flex justify-between items-center">
                        <span>{employee.name}</span>
                        <button
                          className={`px-2 py-1 rounded ${
                            isAssigned
                              ? 'bg-green-500 cursor-default'
                              : 'bg-blue-500 hover:bg-blue-600'
                          } text-white`}
                          disabled={isAssigned}
                          onClick={() => !isAssigned && assignProjectToEmployee(employee.employee_id)}
                        >
                          {isAssigned ? 'Assigned' : 'Assign'}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <p>No employees found.</p>
                )}
              </ul>
            )}

            <div className="mt-4 text-right">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4 border-b">Name</th>
            <th className="text-left py-2 px-4 border-b">Role</th>
            <th className="text-left py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">Developer</td>
            <td className="py-2 px-4 border-b">john@example.com</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Members;
