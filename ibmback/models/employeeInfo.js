const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    uid:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    join_date:{
        type: String,
        required: true,
    },
    projects:{
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Employee', employeeSchema);