const express = require('express'); //Line 1
const bodyParser = require("body-parser");
const app = express(); //Line 2
const crypto = require("crypto");
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const path = require('path');




const port = process.env.PORT || 5000; //Line 3
const certificationRoutes = require("./certification.js");
const userRoutes = require("./user.js");


const uri = "mongodb+srv://team16:team16database@solutio.l6ersza.mongodb.net/?retryWrites=true&w=majority";

const conn = mongoose.createConnection(uri);




app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'))
app.use(bodyParser.json());

app.use(certificationRoutes);
app.use(userRoutes);
app.set('view engine', 'ejs');



// async function connect(){
//   try{
//     await mongoose.connect(uri);
//     console.log("Connected to MongoDB");
//   }
//   catch (error){
//     console.error(error);
//   }
// }

var gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// connect();


app.listen(port, () => console.log(`Listening on port ${port}`)); 


app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});

app.get('/', (req, res) => {
  res.render('index');
})

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
  console.log('Hi');
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  //  res.json({ file: req.file });
  //  console.log(res);
  res.redirect('/');
});