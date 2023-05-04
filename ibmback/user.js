const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const userSchema = require('./models/user.js');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.static(path.resolve(__dirname,'public')));

var storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/uploads')

    },
    filename:(req,file,cb) => {
        cb(null,file.originalname)

    }


});

var upload = multer({storage: storage});

const userController = require('./controllers/userController')

router.post("/importFile", upload.single('file'),userController.importCertification)


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