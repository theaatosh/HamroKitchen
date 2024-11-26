require('dotenv').config();
const availableCook=require('./haversine');
const loadBalancer=require('./loadBalancing');
const orders=require('./models/orderModel');
const { parse } = require('date-fns');


const assignCookOrder=async (order)=>{
        try{
            console.log("assignig orders to cook");
            const orderId=(order._id).toString();
            const customerLocation = order.deliveryInfo.deliveryLocation;
            const cooks=await availableCook(customerLocation, orderId);
            const cook= await loadBalancer(cooks);
           if(cook) {
                console.log("cook with least active orders found");
                const userId= await orders.findById(orderId,{_id:0,userId:1});
                const orderItems= await orders.findById(orderId,{_id:0,orderedItem:1});
                console.log(orderItems.orderedItem[0].id);
                for(i=0;i<cook.length;i++){

                    if(cook[i].kitchenDetails.kitchenID.toString()===userId.userId){
            // if(cook.kitchens._id.toString()===userId.userId){
                await orders.findByIdAndUpdate(orderId,{
                    $set:{
                        orderStatus:"processedWithPayment",
                        rejectedCookId:userId.userId,
                    },
                })
                console.log("No  cook found ");
            } else{
               
                // console.log("here at last");
                // await orders.findByIdAndUpdate(orderId,{
                // $set:{
                //     // cookId:cook[0].kitchens._id,
                //     cookId:cook.kitchens._id,
                //     orderStatus:'assignedToCook',
                //     }
                //     });
                    // console.log(`Order assigned to cook ${ await cook.kitchens._id}`);
                }
              }
            }
                
        }catch(err){
            console.log(err); 
        }
    }  


const fetchOrders=async()=>{
    console.log("checking orders")
    const order=await orders.find({orderStatus:"processedWithPayment",
        paymentStatus:"paid",
    },{ scheduledTime:1,deliveryInfo:1});
    if(order && order.length){
       console.log(order);
       for(let i=0;i<order.length;i++){
           const currentDate = new Date();
           console.log(currentDate)
           const dateFormat = "dd/MM/yyyy, HH:mm:ss";
           const scheduledTime=parse(order[i].scheduledTime, dateFormat, currentDate);
        //    const scheduledTime = new Date(order[i].scheduledTime);
           console.log(scheduledTime);
           if(scheduledTime<=currentDate){
            console.log("here at scheduled");
            assignCookOrder(order[i]);
        }
    }
}else{
    console.log("no order");
}
}
module.exports=fetchOrders;

 