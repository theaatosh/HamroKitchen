const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }

});

const user=mongoose.model("userDetails", userSchema );

module.exports=user;