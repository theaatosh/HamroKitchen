// const express=require(express);
const mongoose=require('mongoose');
const { connectToMongoDB } = require("../connections/index");
const user=require("../models/index")

async function serverSideValidation(userName, email, phoneNumber, password) {

    if(!userName){
        console.log("user name is requires");
        return false;
    }else if(!/[A-Za-z]+\s[A-Za-z]*/.test(userName))
    {
        console.log("userName must start with aplhabet");
        return false;
    }

    if(!email){
        console.log("email is required");
        return false;
    }else if(!/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(email))
    {
        console.log("invalid email");
        return false;
    }

    if(!phoneNumber)
        {
          console.log("Phone number is Required *");
          return false;
        }else if(!/^[0-9]{10}$/.test(phoneNumber))
        {
          console.log("Invalid phone Number")
          return false;
        }
        
    if(!password){
          console.log("Password Is required *");
          return false;
        }else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(password)){

          console.log("Use atleast a uppercase lowercase a digit and a symbol");
          return false;
        }
    

    return true;
    
}


function checkPromise(validationErrors){
    let value= Promise.resolve(true);
    if(value){
        console.log("promise is true");
        return true;
    }else{
        console.log("The promise is false");
        return false;
    }
}

async function checkEmail(email){
     try{
        const result = await user.findOne({email:email});
        console.log(result);
        if (result) {
            console.log("user exist", result);
            return true;
          }else{
            console.log("user doesnot exist moving to registring the user");
            return false;
          }
     }catch(err){
        console.error("Error finding document:", err);
     }

}

//registering user

function registerUser(userName, email, phoneNumber, password){
    try{
        const register=new user({
            userName:userName,
            email:email,
            phoneNumber:phoneNumber,
            password:password,
        });
        register.save();
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

async function checkUserName(userName){
    try{
        const result=await user.findOne({userName:userName})
        .select("password");
        console.log(result);
        if (result) {
            console.log("user found");
            return result;
          }else{
            console.log("user doesnot exist moving to registring the user");
            return false;
          }
     }catch(err){
        console.error("Error finding document:", err);
     }
}

module.exports={
    serverSideValidation , checkPromise, checkEmail, registerUser, checkUserName
}