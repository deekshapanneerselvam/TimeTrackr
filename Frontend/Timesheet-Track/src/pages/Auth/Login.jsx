import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [role, setRole] = useState('Employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        password,
        role
      });

      const { message, user } = response.data;
      console.log(message);

      // Role-based redirection
      const trimmedRole = role.trim().toLowerCase();
      if (trimmedRole === 'employee') {
        navigate('/employee-dashboard');
      } else if (trimmedRole === 'manager') {
        navigate('/manager');
      } else if (trimmedRole === 'admin') {
        navigate('/admin');
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
          <select
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
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

          <label className="label">Password</label>
          <div className="passwordWrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <span
              className="eyeIcon"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </span>
          </div>

          <div className="options">
            <label className="rememberMe">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="#" className="forgotPassword">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>

        <p className="signUpPrompt">
          Don’t have an account?{' '}
          <Link to="/signup" className="signUpLink">
            Register here
          </Link>
        </p>
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

        .passwordWrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .eyeIcon {
          position: absolute;
          right: 12px;
          cursor: pointer;
          font-size: 16px;
        }

        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 16px 0;
        }

        .rememberMe {
          font-size: 13px;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .forgotPassword {
          font-size: 13px;
          color: #7e5bef;
          text-decoration: none;
        }

        .loginBtn {
          background-color: #7e5bef;
          color: #fff;
          border: none;
          padding: 12px;
          font-size: 15px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 8px;
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
