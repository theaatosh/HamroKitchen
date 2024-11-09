const order=require('../models/orderModel');

const myOrder=async(req,res)=>{
    const {userId}=req.user;
    try{
        const orders=await order.find({userId:userId})
        // console.log(orders);
        res.json(orders);
    }catch(err){
        console.log(err);
    }
}

const customerProfile=async(req,res)=>{
    const {userID}=req.body;
    try{
       const found= await user.findById(userId);
       if(found){
        res.json(found);
       }else{
        res.json({message:"user dosent found"});
       }
    }catch(err){
        console.log(err);
        res.json({message:"server error"+err});
    }
}
module.exports={myOrder,customerProfile};