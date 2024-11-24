require('dotenv').config();
const { connectToMongoDB } = require("./connections/index");
const availableCook=require('./haversine');
const loadBalancer=require('./loadBalancing');
const orders=require('./models/orderModel');
const { parse } = require('date-fns');

// const mongo = process.env.URI;
//     connectToMongoDB(mongo)
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.error(err));


const assignCookOrder=async (order)=>{
        try{
            console.log("assignig orders to cook");
            const orderId=(order._id).toString();
            
            // const customerLocation= await orders.find({_id:orderId},{_id:0,deliveryInfo:1})
            const customerLocation = order.deliveryInfo.deliveryLocation;
            // console.log(customerLocation);
            // console.log(customerLocation.lat);
            //trying new so cmt line 22
            //  const cook=await availableCook(customerLocation);
            const cooks=await availableCook(customerLocation, orderId);
            console.log("cooks found");
            const cook= await loadBalancer(cooks);
           
            //  console.log('here');
            console.log(cook);
           if(cook) {
                console.log("cook with least active orders found");
                const userId= await orders.findById(orderId,{_id:0,userId:1});

            if(cook.kitchens._id.toString()===userId.userId){
                await orders.findByIdAndUpdate(orderId,{
                    $set:{
                        orderStatus:"processedWithPayment",
                        rejectedCookId:userId.userId,
                    },
                })
                console.log("No  cook found ");
            } else{
                await orders.findByIdAndUpdate(orderId,{
                $set:{
                    // cookId:cook[0].kitchens._id,
                    cookId:cook.kitchens._id,
                    orderStatus:'assignedToCook',
                }
                    });
                    console.log(`Order assigned to cook ${ await cook.kitchens._id}`);
                }}
                
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
        //    const dateFormat = "dd/MM/yyyy, HH:mm:ss";
        //    const scheduledTime=parse(order[i].scheduledTime, dateFormat, currentDate);
           const scheduledTime = new Date(order[i].scheduledTime);
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

 