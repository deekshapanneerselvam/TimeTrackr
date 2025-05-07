import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, addDays, format } from 'date-fns';

const WeekView = () => {
  const initialRow = {
    project: '',
    task: '',
    time: {
      Mon: '',
      Tue: '',
      Wed: '',
      Thu: '',
      Fri: '',
    },
  };

  const [rows, setRows] = useState([initialRow]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleTimeChange = (index, day, value) => {
    const updatedRows = [...rows];
    updatedRows[index].time[day] = value;
    setRows(updatedRows);
  };

  const calculateTotal = (time) => {
    return Object.values(time).reduce((total, val) => {
      const num = parseFloat(val);
      return total + (isNaN(num) ? 0 : num);
    }, 0);
  };

  const addRow = () => {
    setRows([...rows, initialRow]);
  };

  const getWeekRange = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const end = addDays(start, 4); // Friday
    return `${format(start, 'd MMM')} – ${format(end, 'd MMM yyyy')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Timesheet (
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          Week: {getWeekRange(selectedDate)}
        </span>
        )
      </h2>

      {showCalendar && (
        <div className="mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setShowCalendar(false);
            }}
            inline
            className="react-datepicker__wrapper bg-white shadow-md rounded-lg"
          />
        </div>
      )}

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Project</th>
            <th className="border px-4 py-2">Task</th>
            <th className="border px-4 py-2">Mon</th>
            <th className="border px-4 py-2">Tue</th>
            <th className="border px-4 py-2">Wed</th>
            <th className="border px-4 py-2">Thu</th>
            <th className="border px-4 py-2">Fri</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">
                <select
                  className="w-full p-1 border rounded"
                  value={row.project}
                  onChange={(e) => handleChange(idx, 'project', e.target.value)}
                >
                  <option value="">Select Project</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Internal Tool">Internal Tool</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <input
                  className="w-full p-1 border rounded"
                  placeholder="Task name"
                  value={row.task}
                  onChange={(e) => handleChange(idx, 'task', e.target.value)}
                />
              </td>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <td key={day} className="border px-2 py-1">
                  <input
                    type="number"
                    className="w-16 text-center p-1 border rounded"
                    min="0"
                    value={row.time[day] || ''}
                    onChange={(e) => handleTimeChange(idx, day, e.target.value)}
                  />
                </td>
              ))}
              <td className="border px-4 py-1 font-semibold bg-blue-50 text-center">
                {calculateTotal(row.time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={addRow}
        >
          + Add Timesheet Row
        </button>
      </div>
    </div>
  );
};

export default WeekView;
