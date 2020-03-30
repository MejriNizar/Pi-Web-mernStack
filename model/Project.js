const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    documentation:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'documentation',
        
    }],
    group:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    }],
    name:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true

    },
    startDate: {
        type: Date,
        required:true

    },
    endDate: {
        type: Date,
        required:true
    },
    creationDate: {
        type: Date
    },
    settings: 
        {
            numberOfStudents: {
                type: Number,
            },
            numberTolerence:{
                type: Number,
            },
            skills:{
                type: Boolean,
               
            },
            dueDate: {
                type:Date,

            },
            votingSystem:{
                type:String

            },
            requiredSkills:{
                type: [String]
            },
            numberGroups:{
                type: Number
            }
           
        }
    
});
module.exports = Project = mongoose.model('project',ProjectSchema);
