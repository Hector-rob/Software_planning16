const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const certificationsSchema = require('./models/certification.js');
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

const certificationController = require('./controllers/certificationController.js')
const pendingCertificationController = require('./controllers/pendingCertificationController.js')


router.post("/importCertifications", upload.single('file'),certificationController.importCertification)
router.post("/importPendingCertifications", upload.single('file'),pendingCertificationController.importPendingCertification)


router.get("/exportPendingCertifications", pendingCertificationController.exportPendingCertification)
router.get("/exportCertifications", certificationController.exportCertification)

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