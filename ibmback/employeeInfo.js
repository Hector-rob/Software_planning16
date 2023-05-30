const express = require("express");

const employeeSchema = require('./models/employeeInfo.js');
const router = express.Router();

//Get all employees info
router.get("/employeeInfo", (req, res) => {
    employeeSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
    //console.log(req.json);
});

//Get one employee info
router.get("/employeeInfo/:uid", (req, res) => {
    employeeSchema
    .findOne({"uid": req.params.name}, {_id: 0, __v: 0}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

module.exports = router;