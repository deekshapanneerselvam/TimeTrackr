const Timesheet = require('../models/timesheet.model');
const Curr_user=require('../models/currentUser.model');

// Create a timesheet entry
exports.createTimesheet = async (req, res) => {
  try {
    const {
     project_id, date, task,
      description, start_time, end_time, duration
    } = req.body;
    const user=await Curr_user.findOne();
    const employee_id=user.employee_id;
    const employee_name=user.name;
    

    const timesheet = new Timesheet({
      employee_id,
      employee_name,
      project_id,
      date,
      task,
      description,
      start_time,
      end_time,
      duration
    });

    await timesheet.save();
    res.status(201).json({ message: 'Timesheet entry created', timesheet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create timesheet' });
  }
};

// Get all timesheets (optionally filtered by employee_id)
exports.getTimesheets = async (req, res) => {
  try {
    const { employee_id } = req.query;

    const query = employee_id ? { employee_id } : {};
    const timesheets = await Timesheet.find(query).sort({ date: -1 });

    res.status(200).json(timesheets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch timesheets' });
  }
};

exports.getAllTimeSheets= async(req,res) =>{
    try{
        const timesheets = await Timesheet.find();
        res.status(200).json(timesheets);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch timesheets' });
    }
}


exports.updateStatus = async (req, res) => {
    try {

      const { status ,logId} = req.body;
      console.log("status",status);
      console.log("logId",logId);
  
      if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const updated = await Timesheet.findByIdAndUpdate(
        logId,
        { status },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: 'Timesheet not found' });
      }
  
      res.status(200).json({ message: 'Status updated', timesheet: updated });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
