import React, { useState, useEffect } from 'react';

const Members = ({ project }) => {
  const { project_id, project_name } = project;

  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees and assigned employees as soon as the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [empRes, assignedRes] = await Promise.all([
          fetch('http://localhost:5000/api/employee'),
          fetch(`http://localhost:5000/api/assignment/project/${project_id}`)
        ]);

        const empData = await empRes.json();
        const assignedData = await assignedRes.json();

        setEmployees(empData);

        // Map assigned employees with full employee details
        const assignedEmpDetails = assignedData.map(a => {
          const employee = empData.find(emp => emp.employee_id === a.employee_id);
          return employee ? employee : null;
        }).filter(emp => emp !== null);

        setAssignedEmployees(assignedEmpDetails);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id]); // Only fetch data when project_id changes

  const assignEmployeeToProject = async (employeeId) => {
    try {
      const response = await fetch('http://localhost:5000/api/assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          project_id: project_id,
          project_name: project_name,
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Assigned successfully');
        const newEmployee = employees.find(emp => emp.employee_id === employeeId);
        setAssignedEmployees(prev => [...prev, newEmployee]);
      } else {
        alert(data.message || 'Failed to assign');
      }
    } catch (err) {
      console.error('Error assigning project:', err);
    }
  };

  return (
    <>
      <div className="flex items-end mb-4">
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-blue-600 text-white px-4 py-2  rounded hover:bg-blue-700 ml-auto"
        >
          + Assign User
        </button>
      </div>

      {/* Assign Member Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Assign Member to Project</h2>

            {loading ? (
              <p>Loading employees...</p>
            ) : (
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {employees.length > 0 ? (
                  employees.map(employee => {
                    const isAssigned = assignedEmployees.some(
                      assigned => assigned.employee_id === employee.employee_id
                    );
                    return (
                      <li key={employee.employee_id} className="flex justify-between items-center">
                        <span>{employee.name}</span>
                        <button
                          className={`px-2 py-1 rounded ${isAssigned ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                          disabled={isAssigned}
                          onClick={() => !isAssigned && assignEmployeeToProject(employee.employee_id)}
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

      {/* Table of Assigned Members */}
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4 border-b">Name</th>
            <th className="text-left py-2 px-4 border-b">Role</th>
            <th className="text-left py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {assignedEmployees.length > 0 ? (
            assignedEmployees.map(emp => (
              <tr key={emp.employee_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{emp.name}</td>
                <td className="py-2 px-4 border-b">Member</td>
                <td className="py-2 px-4 border-b">{emp.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 border-b text-center">No members assigned yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Members;
