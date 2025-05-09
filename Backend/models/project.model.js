const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        project_id:{
            type: String,
            required:true,
            unique: true,
        },
        project_name:{
            type: String,
            required:true,
        },
        client:{
            type:String,
            required:true,
        },
        created_at:{
            type:Date,
            required:true,
        },
        
    },
    {
        timestamps:true
    }
);
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
