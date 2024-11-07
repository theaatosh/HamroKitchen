const order=require('../models/orderModel');

const showOrder=async(req,res)=>{
   try{
    const userId=req.user.userId;
    const orders = await order.find({kitchenId:userId});
    if(!orders || orders.length===0){
        return res.json({message:"no orders found for this kitchen"});
    }
    res.json(orders);
    }catch(err){
        console.log(err);
        res.json(err);
    }
}

module.exports=showOrder;