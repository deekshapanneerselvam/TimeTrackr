import React, { useState, useEffect } from 'react';

const Timesheet = () => {
  const [formData, setFormData] = useState({
    date: '2025-05-07',
    project_id: '',
    task: '',
    description: '',
    duration: '', // in hh:mm format
    start_time: '', // in HH:mm
    end_time: '',   // auto-calculated
  });

  const [employeeId, setEmployeeId] = useState(''); // Example — replace with current user logic

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate end_time when start_time or duration changes
      if ((name === 'start_time' || name === 'duration') && updated.start_time && updated.duration) {
        updated.end_time = calculateEndTime(updated.start_time, updated.duration);
      }

      return updated;
    });
  };

  const calculateEndTime = (startTime, duration) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [durHour, durMin] = duration.split(':').map(Number);

    const totalStartMinutes = startHour * 60 + startMin;
    const totalDurationMinutes = durHour * 60 + durMin;
    const totalEndMinutes = totalStartMinutes + totalDurationMinutes;

    const endHour = String(Math.floor(totalEndMinutes / 60)).padStart(2, '0');
    const endMin = String(totalEndMinutes % 60).padStart(2, '0');

    return `${endHour}:${endMin}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/timesheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          ...formData,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Timesheet entry added!');
        // Clear form (optional)
      } else {
        alert(result.message || 'Error saving timesheet');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
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

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          name="project_id"
          placeholder="Project ID"
          value={formData.project_id}
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
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            style={timeInputStyle}
          />
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            readOnly
            style={{ ...timeInputStyle, backgroundColor: '#f3f4f6' }}
          />
        </div>
        <button type="submit" style={submitButtonStyle}>Add Time Log</button>
      </form>
    </div>
  );
};

// Styles same as before
const containerStyle = { padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' };
const titleStyle = { fontSize: '28px', marginBottom: '10px' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const dateInputStyle = { fontSize: '16px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' };
const formStyle = { display: 'grid', gap: '12px' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' };
const textareaStyle = { ...inputStyle, minHeight: '80px' };
const timeContainer = { display: 'flex', gap: '10px' };
const timeInputStyle = { ...inputStyle, flex: 1 };
const submitButtonStyle = { padding: '12px', backgroundColor: '#4338ca', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' };

export default Timesheet;
