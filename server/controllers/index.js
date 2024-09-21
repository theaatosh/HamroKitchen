// const express=require(express);
const mongoose=require('mongoose');
const { connectToMongoDB } = require("../connections/index");
const user=require("../models/index");
const bcrypt=require('bcrypt');


async function serverSideValidation(userName, email, phoneNumber, password) {

    if(!userName){
        console.log("user name is requires");
        return false;
    }else if (!(/^[A-Za-z][A-Za-z0-9]*\s?[A-Za-z0-9]*$/.test(userName))) {
        console.log("userName must start with an alphabet and may include numbers and an optional space.");
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


// function checkPromise(validationErrors){
//     let value= Promise.resolve(validationErrors);
//     if(value){
//         console.log("promise is true");
//         return true;
//     }else{
//         console.log("The promise is false");
//         return false;
//     }
// }

async function checkEmail(email , userName){
     try{   
        const result = await user.findOne({email:email});
        let checkUserName = await user.findOne({userName:userName});
        if (result || checkUserName) {
            console.log("user exist", result);
            if(checkUserName){
                return true;
            }
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

function registerUser(userName, email, phoneNumber, hashedPassword){
    try{
        const register=new user({
            userName:userName,
            email:email,
            phoneNumber:phoneNumber,
            password:hashedPassword,
        });
        register.save();
        return true;
    }
    catch(err){
        return false;
    }
}

async function checkUserName(userName){
    try{
        const result=await user.findOne({userName:userName})
        .select("password");
        if (result) {
            return result;
          }else{
            return false;
          }
     }catch(err){
        console.error("Error finding document:", err);
     }
}

//hash password
const hashPassword = async (password) => {
    const saltRounds=Number(process.env.SALT);
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
          } catch (err) {
            console.error('Error hashing password:', err);
          }
        }
//compare password
const comparePasswords = async (password, result) => {
    try {
        const match = await bcrypt.compare(password, result);
        return match; 
    } catch (err) {
      console.error('Error comparing passwords:', err);
    }

};


module.exports={
    serverSideValidation , checkEmail, registerUser, checkUserName, hashPassword, comparePasswords
}