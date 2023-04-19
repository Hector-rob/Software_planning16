const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    
    },
    department: {
        type: String,
        required: true
    },
    work_location: {
        type: String,
        required: true
    },
    certification_name: {
        type: String,
        required: true
    },
    issue_date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);