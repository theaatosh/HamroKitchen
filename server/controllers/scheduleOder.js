const order=require("../models/orderModel");
const scheduleOder=async (req,res)=>{

    const{userId}= req.user;
    const{items,totalAmount,deliveryFee,scheduledTime}=req.body;
    const orderStatus='Onprocess'
    const alreadySaveOrder=await order.find({userId:userId, orderStatus:orderStatus});
    // console.log(alreadySaveOrder);
    if(alreadySaveOrder){
       const updateOrder= await order.findOneAndUpdate({_id:alreadySaveOrder[0]}, 
        {$set:{
            userId:userId,
            orderedItem:items,
            totalAmount:totalAmount,
            scheduledTime:scheduledTime,
        }
        }, 
        { new: true }  
    );
    // if(updateOrder){
    //     console.log("order updated");
    // }else{
    //     console.log("not updated");
    // }
    }
    else{
    try{
        const listOrder=new order({
            userId:userId,
            orderedItem:items,
            totalAmount:totalAmount,
            scheduledTime:scheduledTime,
        });
        listOrder.save();
    }catch(err){
        console.log(err);
    }
}
    res.send("done");
}
module.exports=scheduleOder;