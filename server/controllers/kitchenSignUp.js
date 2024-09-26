const express=require("express");
const mongoose=reuire("mongoose");
const user = require("../models");


const kitchenSignUp=async (req,res)=>{
    const {foodItemCook,location }=req.body;
    try{
        const userDetails= await user.findOne({_id:req.user.userId});
        const userStatus= userDetails.role;
        if(userStatus==="kitchen"){
            res.send("already registered as cook");
        }else if(userStatus==="customer"){
            
        }
    } catch(err){

    }
}