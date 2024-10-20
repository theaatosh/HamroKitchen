const express=require("express");
const mongoose=require("mongoose");
const user = require("../models/index");


const kitchenSignUp=async (req,res)=>{
    const {category,location }=req.body;
    try{
        // console.log(req.user.userId);
        const userDetails= await user.findById(req.user.userId);
        // console.log(userDetails);
        if(userDetails){
            const userStatus= userDetails.role;
            // console.log(userStatus);
             if(userStatus==="customer"){
                // console.log("we are here");
                const updatedUser=await user.findByIdAndUpdate(req.user.userId,{ 
                    role:"pending",
                cookLocation:location,
                cookFoodItem:category,
            });
            if(updatedUser){res.status(200).send("registered as Kitchen");}
           }
             else if(userStatus==="kitchen"){
                res.status(400).send("already registered as cook");
            }else if(userStatus==="admin"){
                res.status(400).send("admin can't registered itself as cook");
            }else if(userStatus==="pending"){
                res.status(400).send("waiting for admin aproval");
            }
        }else{
            res.status(400).send("user not found");
        }
    } catch(err){
        console.log(err);
        res.send(err);
    }
}
 
module.exports=kitchenSignUp;