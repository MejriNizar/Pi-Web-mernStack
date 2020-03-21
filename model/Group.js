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
        type: String

    },
    slogan: {
        type: String

    }
    
});
module.exports = Group = mongoose.model('group',GroupSchema);
