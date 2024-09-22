const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();
const cors = require('cors'); // Import the cors middleware
const user = require("./models/index");
const { connectToMongoDB } = require("./connections/index");
const { serverSideValidation , checkEmail, registerUser, checkUserName, hashPassword,comparePasswords } = require("./controllers/index");
require('dotenv').config();
const foodItemDetails=require('./models/adminAddItem.js');
const app = express();
app.use(express.json());
app.use(cors()); 

const PORT = process.env.PORT;
const mongo = process.env.URI;



connectToMongoDB(mongo)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

//routes 


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
        let hashedPassword= await hashPassword(password);
        let user= registerUser(userName, email, phoneNumber, hashedPassword);
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
  let {userName, password}=req.body;
  var userFound= await checkUserName(userName);
  if(userFound){
    const matched= await comparePasswords(password, userFound.password);
    if(matched){
      res.send("login sucessfully");
    }else{
      res.send("incorrect password");
    }
 
  }else{
    res.send("user doesnt exist please register first");
  }

});

const addItemsRoute = require('./routes/addItemsRoute.js');
app.use('/addItems', addItemsRoute);
app.use("/uploads", express.static("uploads"));// access image publicly

app.get('/topDishes',async (req, res)=>{
  try {
    const foodItems = await foodItemDetails.find(); // Assuming FoodItem is your model
    res.status(200).send(foodItems);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch food items' });
  }
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
