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

    },
    etat:{
        type:String,
        default:"open"
    },
    description:{
        type:String,
    },
    delai:{
        type:String
    }

});
module.exports = Task = mongoose.model('task',TaskSchema);