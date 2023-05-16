const mongoose = require("mongoose");

const certificationsSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    
    },
    department: {
        type: String,
        required: false
    },
    work_location: {
        type: String,
        required: false
    },
    certification_name: {
        type: String,
        required: true
    },
    issue_date: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Certifications', certificationsSchema);