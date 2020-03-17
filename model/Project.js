const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    documentation:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'documentation'
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
        type: String

    },
    startDate: {
        type: Date

    },
    endDate: {
        type: Date,
        required:true
    }
    
});
module.exports = Project = mongoose.model('project',ProjectSchema);
