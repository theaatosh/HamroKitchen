const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const user = require("./models/index");
const { connectToMongoDB } = require("./connections/index");
const { serverSideValidation , checkPromise, checkEmail, registerUser, checkUserName } = require("./controllers/index");

const app = express();
app.use(express.json());
app.use(cors()); // Use the cors middleware

const PORT = 5010;

connectToMongoDB('mongodb://localhost:27017/userDetailsDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

//test 
// registerUser("test", "test", "test", "test");

app.post('/signup', async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;
  console.log("Connected to signUpPage");
 
  
  // Perform server-side validation
  const validationErrors  = serverSideValidation(userName, email, phoneNumber, password);
  console.log(validationErrors);

  //chechking promise
  const check=checkPromise(validationErrors);
  if(check){
    console.log("Checked whether user exists or not");
    const existingUser= await checkEmail(email);
    
    if(!existingUser){
     let user= registerUser(userName, email, phoneNumber, password);
     if(user){
      console.log("user registered");
      res.send("user registered sucessfully");
     }
}
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
