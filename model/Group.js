const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    name:{
        type: String,
        required:true
    },
    logo: {
        data: Buffer,
        type: String

    },
    slogan: {
        type: String

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
            }
           
        }
    
    
    
});
module.exports = Group = mongoose.model('group',GroupSchema);
