import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [role, setRole] = useState('Employee');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        employee_id: employeeId,
        role
      });

      const { message, user } = response.data;
      console.log(message);

      const trimmedRole = user.role.trim().toLowerCase();
      if (trimmedRole === 'employee') {
        navigate('/employee/timesheet');
      } else if (trimmedRole === 'manager') {
        navigate('/manager/team-timesheet');
      } else if (trimmedRole === 'admin') {
        navigate('/admin/analysis');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  if (!mounted) return null;

  return (
    <main className="wrapper">
      <div className="loginContainer">
        <div className="iconWrapper">
          <span className="clockIcon">🕒</span>
        </div>
        <h2 className="heading">Welcome to TimeTracker</h2>
        <p className="subheading">Please login to your account</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Select Role</label>
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Employee</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>

          <label className="label">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />

          <label className="label">Employee ID</label>
          <input
            type="text"
            placeholder="Enter your employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="loginBtn">Login</button>
        </form>

        
      </div>

      <style>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f7f9fc;
        }
        .loginContainer {
          width: 100%;
          max-width: 400px;
          padding: 40px 30px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .iconWrapper {
          margin-bottom: 16px;
        }
        .clockIcon {
          font-size: 36px;
        }
        .heading {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #1f2937;
        }
        .subheading {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }
        .form {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .label {
          font-size: 14px;
          font-weight: 500;
          margin: 12px 0 6px;
          color: #374151;
        }
        .select,
        .input {
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          width: 100%;
          outline: none;
          box-sizing: border-box;
        }
        .select {
          cursor: pointer;
        }
        .loginBtn {
          background-color: #7e5bef;
          color: #fff;
          border: none;
          padding: 12px;
          font-size: 15px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 16px;
          transition: background 0.3s ease;
        }
        .loginBtn:hover {
          background-color: #5a3ec8;
        }
        .signUpPrompt {
          font-size: 14px;
          margin-top: 20px;
          color: #4b5563;
          text-align: center;
        }
        .signUpLink {
          color: #7e5bef;
          text-decoration: none;
          margin-left: 4px;
        }
      `}</style>
    </main>
  );
}
