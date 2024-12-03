require('dotenv').config();
const availableCook=require('./haversine');
const loadBalancer=require('./loadBalancing');
const orders=require('./models/orderModel');
const user=require("./models/index");
const { parse , format } = require('date-fns');


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
                const orderItem=orderItems.orderedItem;
                const orderSperationToKitchen=[];
                const assignedOrderItemIds = new Set();
                for(i=0;i<cook.length;i++){
                    if(cook[i].kitchenDetails.kitchenID.toString()===userId.userId){
                        console.log("skiping");
                        continue;
                    }
                const cookId=cook[i].kitchenDetails.kitchenID.toString();
                const cookFoodItem= await user.findById(cookId,{_id:0,cookFoodItem:1})
                const cookFoodItemArray= Object.keys(cookFoodItem.cookFoodItem);
                // console.log(cookFoodItem.cookFoodItem[cookFoodItemArray[0]]);
                for(k=0;k<orderItem.length;k++){
                    console.log(assignedOrderItemIds);
                    if (assignedOrderItemIds.has(orderItem[k].id)) {
                        console.log("skip item");
                        continue;
                    }


                    for(j=0;j<cookFoodItemArray.length;j++){
                        // console.log("1")
                        // console.log(orderItem[k].id)
                        // console.log(cookFoodItem[cookFoodItemArray[j]]);
                        // console.log("1")
                        
                        if(orderItem[k].id===cookFoodItem.cookFoodItem[cookFoodItemArray[j]]){
                            console.log("here");
                            orderSperationToKitchen.push({
                                orderItemId: orderItem[k].id,
                                kitchenId:cookId
                            });
                            console.log("hi");
                            assignedOrderItemIds.add(orderItem[k].id);
                            break;
                        } 
                    }
                }
                
                if (orderSperationToKitchen.length === orderItem.length) {
                    console.log("All order items have been assigned.");
                    break;
                }
              }
              if(orderItem.length===orderSperationToKitchen.length){
                try{await orders.findByIdAndUpdate(orderId,{
                    $set:{
                            orderCookIDDetails:orderSperationToKitchen,
                            orderStatus:'assignedToCook',
                        }
              });
              console.log("your order has been placed to "+orderSperationToKitchen.kitchenId)
            }  catch(err){
                console.log(err);
              }
            }else{
                const orderItemIdMaking = orderSperationToKitchen.map(item => item.orderItemId);
                const remaingOrderItemId= orderItem.filter(item => !orderItemIdMaking.includes(item))
                if(remaingOrderItemId.length==orderItem.length){
                    console.log("No kitchen can fulfill any of the order items.");
                }else{
                await orders.findByIdAndUpdate(orderId,{
                    $set:{
                            orderCookIDDetails:orderSperationToKitchen,
                            remaingOrderItemId:remaingOrderItemId,
                            orderStatus:'assignedToCookPartially',
                        }
              });
              console.log("cook id"+orderSperationToKitchen.kitchenId)
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
           const dateFormat = "dd/MM/yyyy, HH:mm:ss";
           const currentDate=new Date();
        //    const currentDate = format(new Date(), dateFormat);
           console.log(currentDate)
           const scheduledTime=await parse(order[i].scheduledTime, dateFormat, new Date());
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

 