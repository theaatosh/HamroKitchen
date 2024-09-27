const express=require("express");
const mongoose=require("mongoose");
const user = require("../models/index");


const kitchenSignUp=async (req,res)=>{
    const {foodItemCook,location,id }=req.body;
    
    try{
        const userDetails= await user.findOne({userName:"test"});
        console.log(userDetails);
        if(userDetails){
            const userStatus= userDetails.role;
            if(userStatus==="kitchen"){
                res.send("already registered as cook");
            }else if(userStatus==="admin"){
                res.send("admin can't registered itself as cook");
            }else if(userStatus==="customer"){
                console.log("we are here");
                const updatedUser=await user.findOneAndUpdate({userName:"test"},{ 
                    role:"pending",
                cookLocation:location,
                cookFoodItem:foodItemCook,
            });

            if(updatedUser){res.send("registered as Kitchen");}
            else{res.send("error");}
        }
        }else{
            res.send("user not found");
        }
    } catch(err){
        console.log(err);
        res.send(err);
    }
}
 
module.exports=kitchenSignUp;