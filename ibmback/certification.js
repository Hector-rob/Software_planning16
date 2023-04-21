const express = require("express");

const certificationsSchema = require('./models/certification.js');
const router = express.Router();

//create certification
router.post("/certification", (req, res) => {
    const certification = certificationsSchema(req.body);
    certification 
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


//get all certifications

router.get("/certification", (req, res) => {
    certificationsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//get a certification

router.get("/certification/:uid", (req, res) => {
    certificationsSchema
    .findOne({"uid": req.params.uid}, {_id: 0, __v: 0}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//Update a certification
router.put("/certification/:uid", (req, res) => {
    const {uid, 
        department,
        work_location,
        certification_name,
        issue_date,
        type} = req.body;
    certificationsSchema
    .updateOne({"uid": req.params.uid}, //Update through the use of uid
    {$set: {
        uid, 
        department,
        work_location,
        certification_name,
        issue_date,
        type
    }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//delete a certification

router.delete("/certification/:uid", (req, res) => {
    certificationsSchema
    .deleteOne({"uid": req.params.uid}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


module.exports = router;