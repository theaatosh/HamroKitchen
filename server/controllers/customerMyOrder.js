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

module.exports=myOrder;