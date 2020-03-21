const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type: String,
        required:true
    },
    description: {
        type: String

    },
    place: {
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
module.exports = Event = mongoose.model('Event',EventSchema);