import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Employee',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Send POST request to the backend signup endpoint
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log('Signup successful:', response.data);

      // On successful signup, you can handle success message or redirect
      // Redirect to login page after successful signup (Optional)
      alert('Signup successful! Please log in.');
      // You can use react-router for redirection
      // history.push('/login');  // If you're using useHistory() from react-router-dom

    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      // Display error message from the backend
      setError(error.response?.data?.message || 'An error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <style>{`
        .signupContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f7fa;
        }

        .signupBox {
          background-color: white;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 420px;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }

        .signupForm {
          display: flex;
          flex-direction: column;
        }

        .input {
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          background-color: white;
          color: #333;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .input:focus {
          border-color: #7e5bef;
        }

        .signupButton {
          background-color: #7e5bef;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .signupButton:hover {
          background-color: #5a3ec8;
        }

        .redirectText {
          text-align: center;
          margin-top: 16px;
          font-size: 14px;
          color: #555;
        }

        .loginLink {
          color: #7e5bef;
          text-decoration: none;
        }

        .loginLink:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="signupBox">
        <h2 className="title">Sign Up</h2>
        <form className="signupForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="signupButton" disabled={loading}>
            {loading ? 'Signing Up...' : 'Create Account'}
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <p className="redirectText">
          Already have an account?{' '}
          <Link to="/login" className="loginLink">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
