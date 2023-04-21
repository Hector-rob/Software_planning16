const express = require("express");

const userSchema = require('./models/user.js');
const router = express.Router();


//FILTER AND PARAMS ARE JUST BY NAME IMPORTANT NOTE

//create user
router.post("/user", (req, res) => {
    const user = userSchema(req.body);
    user 
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


//get all cusers

router.get("/user", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//get a user

router.get("/user/:name", (req, res) => {
    userSchema
    .findOne({"name": req.params.name}, {_id: 0, __v: 0}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//Update a user
router.put("/user/:name", (req, res) => {
    const {email, 
        name,
        last_name,
        password,
        country,
        department} = req.body;
    userSchema
    .updateOne({"name": req.params.name}, //Update through the use of uid
    {$set: {
        email, 
        name,
        last_name,
        password,
        country,
        department
    }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//delete a user

router.delete("/user/:name", (req, res) => {
    userSchema
    .deleteOne({"name": req.params.name}) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


module.exports = router;