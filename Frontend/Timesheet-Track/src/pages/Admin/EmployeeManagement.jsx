import React, { useState, useEffect } from 'react';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [fetchedEmployees, setFetchedEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    employee_id: '',
    name: '',
    email: '',
    department: '',
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employee');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        setFetchedEmployees(data);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({}); 
  };

  const handleAddEmployee = async () => {
  // Check if any field is empty
  if (!formData.employee_id || !formData.name || !formData.email || !formData.department) {
    setFormErrors({ general: 'All fields are required!' });
    return;
  }

  // Check if employee_id or email already exists
  const existingEmployee = employees.find(
    (emp) => emp.employee_id === formData.employee_id || emp.email === formData.email
  );

  if (existingEmployee) {
    setFormErrors({ general: 'Employee ID or Email already exists!' });
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      setFormData({
        employee_id: '',
        name: '',
        email: '',
        department: '',
      });
      setFormErrors({});
    } else {
      console.error('Failed to add employee');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  const handleEditEmployee = (emp) => {
    setEditEmployee(emp);
    setFormData(emp);
    setDialogType('edit');
    setIsDialogOpen(true);
    setFormErrors({});
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/employee/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Remove the deleted employee from the state immediately
          setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));
        } else {
          console.error('Delete failed');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };
  
  const handleSaveEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employee/${formData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.department
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Employee updated successfully!");
        setIsDialogOpen(false);
        fetchEmployees();// Refresh list
      } else {
        alert(result.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };
  

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <style>{`
        .form-row {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .form-row input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          flex: 1;
          min-width: 180px;
        }

        .add-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          width: auto;
        }

        .search-input {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .employee-table {
          width: 100%;
          border-collapse: collapse;
        }

        .employee-table th,
        .employee-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .employee-table th {
          background-color: #f3f4f6;
        }

        .no-data {
          color: #555;
          margin-top: 10px;
        }

        .dialog {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dialog-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .dialog-header {
          font-size: 1.2em;
          margin-bottom: 15px;
        }

        .dialog-input {
          width: 100%;
          padding: 8px;
          margin: 10px 0 0 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .error {
          color: red;
          font-size: 0.8em;
          margin-bottom: 10px;
        }

        .dialog-button {
          background-color: #4f46e5;
          color: white;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px;
        }

        .dialog-button.cancel {
          background-color: #ccc;
        }
      `}</style>

      <h2>Employee Management</h2>

      <div className="form-row">
        <div style={{ flex: 1 }}>
          <input
            type="text"
            name="employee_id"
            placeholder="Emp ID"
            value={formData.employee_id}
            onChange={handleChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <button className="add-button" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>

      {formErrors.general && <div className="error">{formErrors.general}</div>}

      <input
        type="text"
        className="search-input"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    style={{ padding: '4px 10px' }}
                    onClick={() => handleEditEmployee(emp)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '4px 10px', marginLeft: '5px' }}
                    onClick={() => handleDelete(emp.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isDialogOpen && (
  <div className="dialog">
    <div className="dialog-content">
      <h3 className="dialog-header">Edit Employee</h3>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="dialog-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="dialog-input"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="dialog-input"
        />
        <button className="dialog-button" onClick={handleSaveEmployee}>
          Save Changes
        </button>
        <button
          className="dialog-button cancel"
          onClick={() => setIsDialogOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default EmployeeManagement;
