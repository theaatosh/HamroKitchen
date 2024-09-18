const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const user = require("./models/index");
const { connectToMongoDB } = require("./connections/index");
const { serverSideValidation , checkPromise, checkEmail, registerUser, checkUserName } = require("./controllers/index");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors()); // Use the cors middleware

const PORT = process.env.PORT;
const mongo = process.env.URI;

connectToMongoDB(mongo)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

//test 
// registerUser("test", "test", "test", "test");

app.post('/signup', async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;
  console.log("Connected to signUpPage");
 
  
  // Perform server-side validation
  const validationErrors  = await serverSideValidation(userName, email, phoneNumber, password);
  console.log(validationErrors);

  if(validationErrors){
    console.log("Checking whether user exists or not");
    try{
      const existingUser= await checkEmail(email, userName);

      if(!existingUser){
        let user= registerUser(userName, email, phoneNumber, password);
        if(user){
         res.status(200).send("user registered sucessfully");
        }else{
         res.status(400).send("error while registering");
        }
   }
   else
   {
    res.status(401).send("User already exist");
   }
    }
  catch(err){
        console.log(err);
      }  
}else{
  console.log("validation Error");
}
});
 //login authentication
app.post('/login', async (req, res) =>{
  console.log("request");
  let {userName, password}=req.body;
  console.log("Data received from loginpage:");

  var userFound= await checkUserName(userName);
  console.log(userFound);
  if(userFound){
    if(userFound.password==password){
      console.log("login sucessfully");
      res.send("login sucessfully");
    }else{
      console.log("incorrect password");
      res.send("incorrect password");
    }
 
  }else{
    res.send("user doesnt exist please register first");
  }

});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
