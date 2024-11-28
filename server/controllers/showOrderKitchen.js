const order=require('../models/orderModel');
const user= require('../models/index');
const showOrder=async(req,res)=>{
   try{
    const userId=req.user.userId;
    // const orders = await order.find({
    //     orderStatus:"assignedToCook",
    // });
    const orders = await order.find({
        orderStatus: { $in: ["assignedToCook", "assignedToCookPartially"] }
      });
    const arr=[]
    for(k=0;k<orders.length;k++){
        const order = orders[k];
        const orderCookIDDetails = order.orderCookIDDetails;

        for(i=0;i<orderCookIDDetails.length;i++){
        if(orderCookIDDetails[i].kitchenId===userId){
            for(j=-0;j<orders.length;j++){
                if(orderCookIDDetails[i].orderItemId===order.orderedItem[j].id){
                    arr.push({
                        orderDetails:order,
                        orderItemId:orderCookIDDetails[i].orderItemId,
                        orderItemName:order.orderedItem[j].name,
                        quantity:order.orderedItem[j].quantity,
                    })
                }
            }
        }
    }
}
    // console.log(arr);
    if(!arr || arr.length===0){
        return res.json({message:"no orders found for this kitchen"});
    }else{
        res.json(arr ) ;
    }
    
    }catch(err){
        console.log(err);
        res.json(err);
    }
}
const acceptOrder=async(req,res)=>{
    const {orderId}=req.body;
    const {userId}=req.user;
   try{
     const order= await order.findById(orderId);
     const kitchenIds = order.orderCookIDDetails.map(item => item.kitchenId);
     const allSameKitchen = kitchenIds.every(id => id === kitchenIds[0]);
        if(allSameKitchen){
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
        }else{
            const itemToMove = order.orderCookIDDetails.find(item => item.kitchenId.toString() === userId.toString());
            const updated=await order.findByIdAndUpdate(orderId,{
                $set:{
                    orderStatus:"processingPartially",
                   
                },
                $push:{
                    partiallyAcceptedOrderID:itemToMove,
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
    // if(update){
    //     const updated=await order.findByIdAndUpdate(orderId,{
    //         $set:{
    //             orderStatus:"processing",
    //         }
    //     })
    //     const increaseActiveOrders= await user.findByIdAndUpdate(userId,{
    //         $inc: {
    //             activeOrders: 1,
    //         }
    //     })
    //     if(updated && increaseActiveOrders){
    //         res.json({message:"Done"});
    //     }
    // }

}catch(err){
    console.log(err);
}
}

const rejectOrder=async(req,res)=>{
    const {orderId}=req.body;
    const {userId}=req.user;
    try{
        const order= await order.findById(orderId);
        const kitchenIds = order.orderCookIDDetails.map(item => item.kitchenId);
        const allSameKitchen = kitchenIds.every(id => id === kitchenIds[0]);
        if(allSameKitchen){
            const updatedRej=await order.findByIdAndUpdate(orderId,{
                        $set:{
                            orderStatus:"processedWithPayment",
                        },
                        $push:{
                            rejectedCookId:userId,
                        },
                        $unset:{
                            orderCookIDDetails:"", 
                        }
                    })
                    if(updatedRej){
                                res.json({message:"Done"});
                            }
                    
        }else{
            const itemToMove = order.orderCookIDDetails.find(item => item.kitchenId.toString() === userId.toString());
            const updatedRej=await order.findByIdAndUpdate(orderId,{
                $set:{
                    orderStatus:"assignedToCookPartially",
                },
                $push:{
                    rejectedCookId:userId,
                },
                $pull: {
                    orderCookIDDetails: { kitchenId: userId }
                  },
                  $push:{
                    remaingOrderItemId:itemToMove
                  }
            })
            if(updatedRej){
                res.json({message:"Done"});
            }
        }
        // if(updateRej){
        //     const updatedRej=await order.findByIdAndUpdate(orderId,{
        //         $set:{
        //             orderStatus:"assignedToCookPartially",
        //             rejectedCookId:userId,
        //         },
        //         $unset:{
        //            cookId:"", 
        //         }
        //     })
        //     if(updatedRej){
        //         res.json({message:"Done"});
        //     }
        // }

    }catch(err){
        console.log(err);
    }
}

const processingOrder=async(req,res)=>{
    try{
        // console.log("here");
        const userId=req.user.userId;
        // const orderss = await order.find({cookId:userId ,
        //     orderStatus:"processing",
        // });
        const orderss = await order.find({
            cookId: userId,
            orderStatus: { $in: ["processing", "processingPartially"] }
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
     const order= await order.findById(orderId);
     if(!order){
        res.status(404).json({message:"no order found"});
     }
     const kitchenIds = order.orderCookIDDetails.map(item => item.kitchenId);
     const allSameKitchen = kitchenIds.every(id => id === kitchenIds[0]);

     let updated, decreaseActiveOrders;
     if(allSameKitchen){
         updated=await order.findByIdAndUpdate(orderId,{
                    $set:{
                        orderStatus:"completed",
                    }
                })
                 decreaseActiveOrders= await user.findByIdAndUpdate(userId,{
                    $inc: {
                        activeOrders: -1,
                    }
                })
     }else{
        const itemToMove = order.orderCookIDDetails.find(item => item.kitchenId.toString() === userId.toString());
         updated=await order.findByIdAndUpdate(orderId,{
            $set:{
                orderStatus:"completedPartially",
            },
            $push:{
                partiallyAcceptedOrderID:itemToMove,
            }
            
        })
         decreaseActiveOrders= await user.findByIdAndUpdate(userId,{
            $inc: {
                activeOrders: -1,
            }
        })
     }
     const updatedOrderData = await order.findById(orderId);

     const allItemsCompleted = updatedOrderData.orderCookIDDetails.every(item =>
         updatedOrderData.partiallyAcceptedOrderID.some(
             completedItem => completedItem.itemId.toString() === item.itemId.toString()
         )
     );
     if(allItemsCompleted){
        await order.findByIdAndUpdate(orderId, {
            $set: { orderStatus: "completed" }
        });
     }
     if(updated && decreaseActiveOrders){
        res.json({message:"completed"});
     }else{
        res.json({message:"Failed to complete order"});
     }
}catch(err){
    console.log(err);
}
}

const showCompletedOrder=async(req,res)=>{
     try{        
        const userId=req.user.userId;
        const orderss = await order.find({cookId:userId ,
            orderStatus:{$in: ["completed", "completedPartially"]},
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