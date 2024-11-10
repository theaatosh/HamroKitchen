require('dotenv').config();
const { connectToMongoDB } = require("./connections/index");
const availableCook=require('./haversine');
const loadBalancer=require('./loadBalancing');
const orders=require('./models/orderModel');

const mongo = process.env.URI;
    connectToMongoDB(mongo)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));


const assignCookOrder=async (order)=>{
        try{
            const orderId=(order._id).toString();
            
            // const customerLocation= await orders.find({_id:orderId},{_id:0,deliveryInfo:1})
            const customerLocation = order.deliveryInfo.deliveryLocation;
            // console.log(customerLocation);
            // console.log(customerLocation.lat);
            //trying new so cmt line 22
            //  const cook=await availableCook(customerLocation);
            const cooks=await availableCook(customerLocation, orderId);
            const cook= await loadBalancer(cooks);
            //  console.log('here');
            // console.log(cook);
           if(cook) {
            await orders.findByIdAndUpdate(orderId,{
                $set:{
                    // cookId:cook[0].kitchens._id,
                    cookId:cook.kitchens._id,
                    orderStatus:'assignedToCook',
                }
                    });
                    console.log("vayo");
                }
                
        }catch(err){
            console.log(err);
            
        }
    }  


const fetchOrders=async()=>{
    const order=await orders.find({orderStatus:"processedWithPayment",
        paymentStatus:"paid",
    },{ scheduledTime:1,deliveryInfo:1});
    if(order && order.length){
    //    console.log(order.length);
       for(let i=0;i<order.length;i++){
           const currentDate = new Date();
           const scheduledTime = new Date(order[i].scheduledTime);
           if(scheduledTime<=currentDate){
            // console.log("here at scheduled");
            assignCookOrder(order[i]);
        }
    }
}else{
    console.log("no order");
}
}
fetchOrders();

 