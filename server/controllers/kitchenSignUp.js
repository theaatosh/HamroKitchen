const express=require("express");
const mongoose=require("mongoose");
const user = require("../models/index");


const kitchenSignUp=async (req,res)=>{
    // console.log(req.body);
    const {selectedItems,location }=req.body;
    console.log(selectedItems);
    try{
        const userDetails= await user.findById(req.user.userId);
        if(userDetails){
            const userStatus= userDetails.role;
             if(userStatus==="customer"){
                const updatedUser=await user.findByIdAndUpdate(req.user.userId,{ 
                    role:"pending",
                cookLocation:location,
                cookFoodItem:selectedItems,
            });
            if(updatedUser){console.log("done");
                res.status(200).send("registered as Kitchen");}
           }
             else if(userStatus==="kitchen"){
                res.status(400).send("already registered as cook");
            }else if(userStatus==="admin"){
                res.status(400).send("admin can't registered itself as cook");
            }else if(userStatus==="pending"){
                res.status(400).send("waiting for admin aproval");
            }else{
                res.status(400).send("invalid user status");
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