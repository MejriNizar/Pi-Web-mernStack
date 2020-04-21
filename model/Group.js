const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    groupOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        
    }],
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    name:{
        type: String,
        required:true,
        unique: true
    },
    logo: {
        
        type: String

    },
    slogan: {
        type: String

    },
    creationDate: {
        type: Date
    },
    activated:{
        type: Boolean,
        default: false,
    },
    request: [
        {
            etat: {
                type: Boolean,
                default:false
            },
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'user',
                unique: true
            },
            userName:{
                type:String,
                unique:true
            }
        }],
        Vote_Request: [
            {
                votingSystem:{
                    type:String
    
                },
                title:{
                    type: String
                },
                yes: {
                    type: Number
                   
                },
                no: {
                    type: Number
                   
                },
                user:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'user',
                   
                },
                object:{
                    type:String,
                   required:true
                },userName:{
                    type:String,
                    unique:true
                },
                dueDate:{
                    type: Date
                    
                },
                nbVote:{
                    type: Number
                }
            }]
    
    
    
    
});
module.exports = Group = mongoose.model('group',GroupSchema);
