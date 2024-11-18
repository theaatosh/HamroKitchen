const order=require('../models/orderModel');
const user= require('../models/index');
const showOrder=async(req,res)=>{
   try{
    const userId=req.user.userId;
    const orders = await order.find({cookId:userId,
        orderStatus:"assignedToCook",
    });
    if(!orders || orders.length===0){
        return res.json({message:"no orders found for this kitchen"});
    }
    res.json(orders);
    }catch(err){
        console.log(err);
        res.json(err);
    }
}
const acceptOrder=async(req,res)=>{
    const {orderId}=req.body;
    const {userId}=req.user;
   try{
     const update= await order.findById(orderId);
    if(update){
        const updated=await order.findByIdAndUpdate(orderId,{
            $set:{
                orderStatus:"processing",
            }
        })
        const increaseActiveOrders= await user.findByIdAndUpdate(userId,{
            $inc: {
                activeOrders: 1,
            }
        })
        if(updated && increaseActiveOrders){
            res.json({message:"Done"});
        }
    }
}catch(err){
    console.log(err);
}
}

const rejectOrder=async(req,res)=>{
    const {orderId}=req.body;
    const {userId}=req.user;
    try{
        const updateRej= await order.findById(orderId);
        if(updateRej){
            const updatedRej=await order.findByIdAndUpdate(orderId,{
                $set:{
                    orderStatus:"processedWithPayment",
                    rejectedCookId:userId,
                },
                $unset:{
                   cookId:"", 
                }
            })
            if(updatedRej){
                res.json({message:"Done"});
            }
        }

    }catch(err){
        console.log(err);
    }
}

const processingOrder=async(req,res)=>{
    try{
        // console.log("here");
        const userId=req.user.userId;
        const orderss = await order.find({cookId:userId ,
            orderStatus:"processing",
        });
        if(!orderss || orderss.length===0){
            return res.json({message:"All order completed"});
        }
        res.json(orderss);
        }catch(err){
            console.log(err);
            res.json(err);
        }
}

const getKitchenOnline=async(req,res)=>{

    // const status=req.body.newState;
    var status=null;
    if(req.body.newState){
         status="online"
    }
    else{
        status="offline"
    }
    const {userId}=req.user;
    // console.log(userId , status);
    try{
        const kitchen=await user.findByIdAndUpdate(userId,{
            $set:{
                cookStatus:status,
            }
        });
        if(kitchen){
            res.json({message:`${status}`});
        }
        else{
            res.json({message:"can't update"});
        }

    }catch(err){
        console.log(err);
        res.json({ message: "Server error" });
    }
}
const completeOrder=async(req,res)=>{
    const {orderId}=req.body;
    const {userId}=req.user;
   try{
     const update= await order.findById(orderId);
    if(update){
        const updated=await order.findByIdAndUpdate(orderId,{
            $set:{
                orderStatus:"completed",
            }
        })
        const decreaseActiveOrders= await user.findByIdAndUpdate(userId,{
            $inc: {
                activeOrders: -1,
            }
        })
        if(updated && decreaseActiveOrders){
            res.json({message:"completed"});
        }
    }
}catch(err){
    console.log(err);
}
}

const showCompletedOrder=async(req,res)=>{
     try{        
        const userId=req.user.userId;
        const orderss = await order.find({cookId:userId ,
            orderStatus:"completed",
        });
        if(!orderss || orderss.length===0){
            return res.json({message:"No orders to show"});
        }
        res.json(orderss);
        }catch(err){
            console.log(err);
            res.json(err);
        }
}
module.exports={showOrder, acceptOrder, rejectOrder, processingOrder, getKitchenOnline, completeOrder, showCompletedOrder};