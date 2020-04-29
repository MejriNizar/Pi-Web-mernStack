const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    activated:{
        type: Boolean,
        default: false,
    },
    secretToken:{
        type: String
    },
    role:{
        type:String,
        required:true
    },
    group:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    }],
    invitation: [
        {
            etat: {
                type: Boolean,
                default:false
            },
            groupe:{
                type:String,
               
                unique: true
            },
            groupeName:{
                type:String,
                unique:true
            }
        }],
        votes:[{
            vote_request:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Vote_request',
                unique:true

            },
            response:{
                type:Number,
                default:0
            }
        }]
});
module.exports =  User = mongoose.model('user', UserSchema);