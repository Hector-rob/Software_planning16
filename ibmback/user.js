const express = require("express");

const userSchema = require('./models/user.js');
const router = express.Router();

//create user
router.post("/user", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


//get all users

router.get("/user", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//get a user

router.get("/user/:uid", (req, res) => {
    userSchema
    .findOne({"uid": req.params.uid}, {_id: 0, __v: 0}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//Update a user
router.put("/user/:uid", (req, res) => {
    const {uid, 
        department,
        work_location,
        certification_name,
        issue_date,
        type} = req.body;
    userSchema
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

//delete a user

router.delete("/user/:uid", (req, res) => {
    userSchema
    .deleteOne({"uid": req.params.uid}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


module.exports = router;