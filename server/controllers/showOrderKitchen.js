const order=require('../models/orderModel');

const showOrder=async(req,res)=>{
   try{
    const userId=req.user.userId;
    // console.log(userId);
    const orders = await order.find({cookId:userId ,
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
   try{
     const update= await order.findById(orderId);
    if(update){
        const updated=await order.findByIdAndUpdate(orderId,{
            $set:{
                orderStatus:"processing",
            }
        })
        if(updated){
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
                console.log('madarchod');
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
module.exports={showOrder, acceptOrder, rejectOrder, processingOrder};