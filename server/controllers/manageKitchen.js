const user = require("../models/index");

const manageKitchen= async(req,res)=>{
    try{
        const kitchenDetails=await user.findOne({role:"pending"},{_id:0,userName:1,email:1,cookFoodItem:1,cookLocation:1,role:1});
        console.log(kitchenDetails);
        res.json(kitchenDetails);
    }catch(err){
        console.log(err);
    }
}

const updateStatusRight=async(req,res)=>{
    const {userName}=req.body;
   try{ const makeDecision= await user.findOneAndUpdate({userName:userName}, {roll:"kitchen"});
    if(makeDecision){
        res.status(200).send("upgrade to Kitchen");
    }}catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

const updateStatusWrong=async(req,res)=>{
    const {userName}=req.body;
   try{ const makeDecision= await user.findOneAndUpdate({userName:userName}, {roll:"customer"});
    if(makeDecision){
        res.status(200).send("Decline to Customer");
    }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
module.exports={manageKitchen,updateStatusRight,updateStatusWrong};