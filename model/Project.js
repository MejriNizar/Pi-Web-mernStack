const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    documentation:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'documentation',
        unique: true
    }],
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
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
    }
    
});
module.exports = Project = mongoose.model('project',ProjectSchema);
