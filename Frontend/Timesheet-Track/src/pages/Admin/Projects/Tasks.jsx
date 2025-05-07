// src/components/Tasks.jsx
import React from 'react';

const Tasks = () => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Task
        </button>
      </div>
      <p className="text-gray-500 italic">Task list or form will appear here.</p>
    </>
  );
};

export default Tasks;
