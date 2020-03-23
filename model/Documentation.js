const mongoose = require('mongoose');

const DocumentationSchema = mongoose.Schema({
    
    label:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true


    },
    content: {
        type: String,
        required:true

    }
    
});
module.exports = Documentation = mongoose.model('documentation',DocumentationSchema);
