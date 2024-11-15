const order=require("../models/orderModel");
const mongoose=require('mongoose');
const scheduleOder=async (req,res)=>{
    const{userId}= req.user;
    // console.log("here");
    const{items,totalAmount,deliveryFee,scheduledTime}=req.body.cartData;
    const deliveryInfo=req.body.deliveryInfo;
    // const{fNAme,lNAme,email,phNumber,deliveryLocation}=req.body.deliveryInfo;
    // console.log(items);
    const orderStatus='Onprocess'
    const alreadySaveOrder=await order.findOne({userId:userId, orderStatus:orderStatus});
    
    if(alreadySaveOrder!==null){
        const orderId=alreadySaveOrder._id.toString();
        const h=await order.findOne({_id:orderId});
       try{
        await order.findOneAndUpdate({_id:orderId}, 
        {$set:{
            userId:userId,
            orderedItem:items,
            totalAmount:totalAmount,
            deliveryFee:deliveryFee,
            scheduledTime:scheduledTime,
            deliveryInfo:deliveryInfo,
        }
        }, 
        { new: true }  
    );
    // if(updateOrder){
    //     console.log("order updated");
    // }else{
    //     console.log("not updated");
    // }
    }catch(err){
        console.log(err);
    }
   
    }
    else{
    try{

        const listOrder=new order({
            userId:userId,
            orderedItem:items,
            totalAmount:totalAmount,
            deliveryFee:deliveryFee,
            scheduledTime:scheduledTime,
            deliveryInfo:deliveryInfo,
        });
       const h=await listOrder.save();
    //    console.log(h) ;
       
    }catch(err){
        console.log(err);
    }
}
    res.send("done");
}
module.exports=scheduleOder;