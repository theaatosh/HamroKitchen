const order=require('../models/orderModel');
const user= require('../models/index');
const showOrder=async(req,res)=>{
   try{
    const userId=req.user.userId;
    const orders = await order.find({
        orderStatus: { $in: ["assignedToCook", "assignedToCookPartially" , "processingPartially"] }
      });
    let arr=[]
    for(k=0;k<orders.length;k++){
        const order = orders[k];
        const orderCookIDDetails = order.orderCookIDDetails;

        for(i=0;i<orderCookIDDetails.length;i++){
        if(orderCookIDDetails[i].kitchenId===userId){
            for(j=0;j<order.orderedItem.length;j++){
                if(orderCookIDDetails[i].orderItemId.toString()===order.orderedItem[j].id.toString()){
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
    if (order.orderStatus === "processingPartially" && order.partiallyAcceptedOrderID) {
        arr = arr.filter(item =>
            !order.partiallyAcceptedOrderID.some(partial =>
                partial.orderItemId.toString() === item.orderItemId.toString()
            )
        );
    }
}
   
    if(!arr || arr.length===0){
        let a=[]
        return res.status(200).send(a)
    }else{
        res.json(arr) ;
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
     const orders= await order.findById(orderId);
     const kitchenIds = orders.orderCookIDDetails.map(item => item.kitchenId);
     console.log(kitchenIds);
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
            const arr = orders.orderCookIDDetails.filter(obj => 
                obj.kitchenId.toString() === userId.toString()
            );            
            const updated=await order.findByIdAndUpdate(orderId,{
                $set:{
                    orderStatus:"processingPartially", 
                },
                $push: {
                    partiallyAcceptedOrderID: {
                        $each: arr,
                    },
                },
            })
            const increaseActiveOrders= await user.findByIdAndUpdate(userId,{
                $inc: {
                    activeOrders: 1,
                }
            })
            const updatedOrder = await order.findById(orderId);

            const allItemsAccepted = updatedOrder.orderedItem.every(item =>
                updatedOrder.partiallyAcceptedOrderID.some(
                    partial => partial.orderItemId.toString() === item.id.toString()
                )
            );
            if (allItemsAccepted) {
                await order.findByIdAndUpdate(orderId, {
                    $set: { orderStatus: "processing" },
                    $unset: { partiallyAcceptedOrderID: "" } 
                });
            }
        
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
        const orders= await order.findById(orderId);
        const kitchenIds = orders.orderCookIDDetailsOriginal.map(item => item.kitchenId);
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
            const itemToMove = orders.orderCookIDDetails.filter(item => item.kitchenId.toString() === userId.toString());
            
            const updatedRej=await order.findByIdAndUpdate(orderId,{
                $set:{
                    orderStatus:"assignedToCookPartially",
                },
                $push:{
                    partiallyRejectedOrder: {
                        $each: itemToReject,
                    },
                    rejectedCookId:userId,
                },
                $pull: {
                    orderCookIDDetails: { kitchenId: userId }
                  },
                $push: {
                    remaingOrderItemId: {
                        $each: itemToMove
                    }
                }
            })
            const updatedOrder = await order.findById(orderId);

            const allItemsRejected = updatedOrder.orderedItem.every(item =>
                updatedOrder.partiallyRejectedOrder.some(
                    partial => partial.orderItemId.toString() === item.id.toString()
                )
            );

            if (allItemsRejected) {
                await order.findByIdAndUpdate(orderId, {
                    $set: { orderStatus: "processedWithPayment" },
                    $unset: { partiallyRejectedOrder: "" },
                });
            }

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
        const userId=req.user.userId;

        const orderss = await order.find({
            orderStatus: { $in: ["processing", "processingPartially"] },
            "orderCookIDDetails.kitchenId": userId
        });
        if(!orderss || orderss.length===0){
            return res.json({message:"All order completed"});
        }
        const result=[];

        for(let i=0;i<orderss.length;i++){
            const order = orderss[i];
            const arr=[];
            const orderCookIDDetails = order.orderCookIDDetails;
            for(let j=0;j<orderCookIDDetails.length;j++){

                if(orderCookIDDetails[j].kitchenId.toString() === userId.toString()){
                    for(let k=0;k<order.orderedItem.length;k++){
                        if(orderCookIDDetails[j].orderItemId.toString() === order.orderedItem[k].id.toString()){
                            let orderedItem=order.orderedItem[k];
                            if (
                                order.orderStatus === "processingPartially" &&
                                order.partiallyAcceptedOrderID &&
                                !order.partiallyAcceptedOrderID.some(
                                    partial =>
                                        partial.orderItemId.toString() === orderedItem.id.toString() &&
                                        partial.kitchenId.toString() === userId.toString()
                                )
                            ) {
                                continue; // Skip unaccepted items
                            }
                            arr.push({
                                orderDetails: order,
                                orderItemId: orderCookIDDetails[j].orderItemId,
                                orderItemName: order.orderedItem[k].name,
                                quantity: order.orderedItem[k].quantity
                            })
                        }
                    }
                }
            }
           if(arr.length>0) {
                if (order.orderStatus === "processingPartially") {
                result.push({
                    orderDetails: order,
                    partiallyAcceptedOrderID: order.partiallyAcceptedOrderID,
                    orderItems: arr
                });
            } else {
                result.push({
                    orderDetails: order,
                    orderItems: arr
                });
            }}
        } 
        res.json(result);
    
        }catch(err){
            console.log(err);
            res.json(err);
        }
}

const getKitchenOnline=async(req,res)=>{

    var status=null;
    if(req.body.newState){
         status="online"
    }
    else{
        status="offline"
    }
    const {userId}=req.user;
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
     const orders= await order.findById(orderId);
     if(!orders){
        res.status(404).json({message:"no order found"});
     }

     const kitchenIds = orders.orderCookIDDetails.map(item => item.kitchenId.toString());
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
        
        const itemToMove = orders.orderCookIDDetails.find(item => item.kitchenId.toString() === userId.toString());
        if (!itemToMove) {
            return res.status(400).json({ message: "No item to complete for this kitchen" });
        }
         updated=await order.findByIdAndUpdate(orderId,{
            $set:{
                orderStatus:"completedPartially",
            },
            $push:{
                 partiallyCompletedOrderID:itemToMove,
            }
            
        })
         decreaseActiveOrders= await user.findByIdAndUpdate(userId,{
            $inc: {
                activeOrders: -1,
            }
        });
     }
     const updatedOrderData = await order.findById(orderId);

     const allItemsCompleted = updatedOrderData.orderCookIDDetails.every(item =>
         updatedOrderData.partiallyCompletedOrderID.some(
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

        const orderss = await order.find({
            orderStatus:{$in: ["completed", "completedPartially"]},
            "orderCookIDDetails.kitchenId": userId,
        });
        const result = [];

        for(let i=0;i<orderss.length;i++){
            const order = orderss[i];
            const orderItems = [];
            for(let j=0;j<order.orderCookIDDetails.length;j++){
                const orderCookDetail = order.orderCookIDDetails[j];

                if (orderCookDetail.kitchenId.toString() === userId.toString()){
                    const orderedItem = order.orderedItem.find(
                        item => item.id.toString() === orderCookDetail.orderItemId.toString()
                    );
                    if (orderedItem) {
                        orderItems.push({
                            orderItemId: orderCookDetail.orderItemId,
                            orderItemName: orderedItem.name,
                            quantity: orderedItem.quantity
                        });
                    }
                }
            }
              result.push({
                orderDetails: order,
                orderStatus: order.orderStatus,
                orderItems: orderItems
            });
        }
        
        res.json(result);

        }catch(err){
            console.log(err);
            res.json(err);
        }
}
module.exports={showOrder, acceptOrder, rejectOrder, processingOrder, getKitchenOnline, completeOrder, showCompletedOrder};