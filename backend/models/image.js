const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    filename: { 
        type: String, 
        required: true
    },
    data: {
        type: Buffer,   
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);
