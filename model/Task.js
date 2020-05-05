const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
       

    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    name:{
        type:String,
        required:true

    },
    etat:{
        type:String,
        default:"open"
    }

});
module.exports = Task = mongoose.model('task',TaskSchema);