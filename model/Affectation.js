const mongoose = require('mongoose');

const AffectationSchema = mongoose.Schema({

groupe:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'group'
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
},
etat: {
    type: Boolean,
    default:false
},

});
module.exports =  Affectation = mongoose.model('affectation', AffectationSchema);