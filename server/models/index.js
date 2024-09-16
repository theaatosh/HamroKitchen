const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type:String,
    },
    password:{
        type:String,
    }

});

const user=mongoose.model("Users", userSchema );

module.exports=user;