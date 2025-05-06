const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000; // You can change the port if needed

app.use(express.json()); // To parse JSON requests
app.use(cors()); // Enable CORS

// Connect to MongoDB (Make sure MongoDB is running or use MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/Timesheet_Track', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB:", err));

// Import routes here
const authRoutes = require('./routes/auth');
const empRoutes= require('./routes/employee.routes');
const projectRoute=require('./routes/project.routes');
app.use('/api/auth', authRoutes);
app.use('/api/employee',empRoutes);
app.use('/api/projects',projectRoute);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

