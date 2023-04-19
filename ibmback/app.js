const express = require('express'); //Line 1
const app = express(); //Line 2
const mongoose = require('mongoose');
const port = process.env.PORT || 5000; //Line 3
const userRoutes = require("./user.js");

const uri = "mongodb+srv://team16:team16database@solutio.l6ersza.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(userRoutes);


async function connect(){
  try{
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  }
  catch (error){
    console.error(error);
  }
}

connect();


app.listen(port, () => console.log(`Listening on port ${port}`)); 


app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});