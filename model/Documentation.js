const mongoose = require('mongoose');

const DocumentationSchema = mongoose.Schema({
    
    label:{
        type: String,
        required:true
    },
    description: {
        type: String

    },
    content: {
        type: String
    }
    
});
module.exports = Documentation = mongoose.model('documentation',DocumentationSchema);
