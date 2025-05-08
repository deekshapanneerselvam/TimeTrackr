import React, { useState } from 'react';


const Timesheet = () => {
  const [formData, setFormData] = useState({
    date: '2025-05-07',
    project: '',
    task: '',
    description: '',
    duration: '',
    start: '',
    end: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Track</h2>
      <div style={headerStyle}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={dateInputStyle}
        />
    
      </div>

      <form style={formStyle}>
        <input
          type="text"
          name="project"
          placeholder="Select/create a project..."
          value={formData.project}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="task"
          placeholder="Select/create a task..."
          value={formData.task}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Add log description or drop files..."
          value={formData.description}
          onChange={handleChange}
          style={textareaStyle}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (hh:mm)"
          value={formData.duration}
          onChange={handleChange}
          style={inputStyle}
        />
        <div style={timeContainer}>
          <input
            type="time"
            name="start"
            value={formData.start}
            onChange={handleChange}
            style={timeInputStyle}
          />
          <input
            type="time"
            name="end"
            value={formData.end}
            onChange={handleChange}
            style={timeInputStyle}
          />
        </div>
        <button type="submit" style={submitButtonStyle}>Add Time Log</button>
      </form>
    </div>
  );
};

const containerStyle = {
  padding: '30px',
  maxWidth: '600px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
  fontSize: '28px',
  marginBottom: '10px'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const dateInputStyle = {
  fontSize: '16px',
  padding: '6px 10px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};


const formStyle = {
  display: 'grid',
  gap: '12px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
};

const textareaStyle = {
  ...inputStyle,
  minHeight: '80px'
};

const timeContainer = {
  display: 'flex',
  gap: '10px'
};

const timeInputStyle = {
  ...inputStyle,
  flex: 1
};

const submitButtonStyle = {
  padding: '12px',
  backgroundColor: '#4338ca',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '15px'
};

export default Timesheet;
