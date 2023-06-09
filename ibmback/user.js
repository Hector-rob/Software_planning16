const express = require("express");
const mongoose = require('mongoose');

const userSchema = require('./models/user.js');
const messageSchema = require('./models/message.js');

const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";






//FILTER AND PARAMS ARE JUST BY NAME IMPORTANT NOTE
const User = mongoose.model("Users");
const Message = mongoose.model("Message");
// const Employee = mongoose.model("Employee");

//create user
// router.post("/user", (req, res) => {
//     const user = userSchema(req.body);

//     try{
//         const email = userSchema.findOne({email});
//         console.log("hi");
//         if(email){
//             res.send({error: "User exists"});
//         }
//         user 
//         .save()
//         .then((data) => res.json(data))
//         .catch((error) => res.json({message: error}))
//     }
//     catch(error){
//         res.send({status: "error"});
//     }


// });

router.post("/user", async (req, res) => {
  const { email, name, last_name, password, country, department } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      console.log("User exists");
      return res.json({ error: "User Exists" });
    }
    await User.create({
      email,
      name,
      last_name,
      password: encryptedPassword,
      country,
      department
      // password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

router.post("/send-message", async (req, res) => {
  try{
    const {uid, message} = req.body;
    console.log(uid);
    console.log(message);
    //const employee = await Employee.findOne({ uid });
    // await Message.create({
    //   uid,
    //   message
    // });
    messageSchema.create({
      uid: uid,
      message: message
    });
    res.send({ status: "ok" });

  }
  catch(error){
    res.send({ status: "error" });

  }
});

router.get("/get-message/:uid", (req, res) => {
  messageSchema
    .findOne({ "uid": req.params.uid }, { _id: 0, __v: 0 }) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
});

router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  

  const user = await User.findOne({ email });

  

  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      console.log("Login")
      if(email == "hector@ibm.com" || 
      email == "paola@ibm.com" ||
      email == "diego@ibm.com" ||
      email == "rudy@ibm.com" ||
      email == "raul@ibm.com"){
        return res.json({ status: "manager", data: token });
      }
      console.log(token);
      return res.json({ status: "ok", data: token, email: email });
    } else {
      console.log("Invalid data")
      return res.json({ error: "error" });
    }
  }
  console.log("Invalid data")
  res.json({ status: "error", error: "InvAlid Password" });
});


router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});




// router.get('/login', async(req, res) =>{
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ error: "Invalid data" });
//     }
//     if(password == user.password)


// })



//get all users

router.get("/user", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
});

//get a user

router.get("/user/:name", (req, res) => {
  userSchema
    .findOne({ "name": req.params.name }, { _id: 0, __v: 0 }) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
});

//Update a user
router.put("/user/:name", (req, res) => {
  const { email,
    name,
    last_name,
    password,
    country,
    department } = req.body;
  userSchema
    .updateOne({ "name": req.params.name }, //Update through the use of uid
      {
        $set: {
          email,
          name,
          last_name,
          password,
          country,
          department
        }
      })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
});

//delete a user

router.delete("/user/:name", (req, res) => {
  userSchema
    .deleteOne({ "name": req.params.name }) //Sin _id ni __v de mongo
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
});




module.exports = router;