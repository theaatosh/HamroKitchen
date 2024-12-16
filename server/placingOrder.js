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
            // console.log(cooks);
            const cook= await loadBalancer(cooks);
           if(cook) {
                console.log("cook with least active orders found");
                const userId= await orders.findById(orderId,{_id:0,userId:1});
                const orderItems= await orders.findById(orderId,{_id:0,orderedItem:1});
                const orderItem=orderItems.orderedItem;
                const orderSperationToKitchen=[];
                const assignedOrderItemIds = new Set();

                // available cook sabai check gayerw going thrg it
                for(i=0;i<cook.length;i++){
                    if(cook[i].kitchenDetails.kitchenID.toString()===userId.userId){
                        console.log("skiping");
                        continue;
                    }
                const cookId=cook[i].kitchenDetails.kitchenID.toString();
                const cookFoodItem= await user.findById(cookId,{_id:0,cookFoodItem:1})
                const cookFoodItemArray= Object.keys(cookFoodItem.cookFoodItem);

                //yeta chai order gareko item herni ani checking one by one
                for(k=0;k<orderItem.length;k++){
                    if (assignedOrderItemIds.has(orderItem[k].id)) {
                        console.log("skip item");
                        continue;
                    }

                    //aba chai cook le banauna sakni fooditem ra order item check garni
                    for(j=0;j<cookFoodItemArray.length;j++){
                    
                        if(orderItem[k].id===cookFoodItem.cookFoodItem[cookFoodItemArray[j]]){
                            console.log("here");
                            orderSperationToKitchen.push({
                                orderItemId: orderItem[k].id,
                                kitchenId:cookId
                            });
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
                try{
                    await orders.findByIdAndUpdate(orderId,{
                    $set:{
                            orderCookIDDetails:orderSperationToKitchen,
                            orderCookIDDetailsOriginal:orderSperationToKitchen,
                            orderStatus:'assignedToCook',
                            partiallyRejectedOrder:[]
                        },
              });
            //   console.log("your order has been placed to "+orderSperationToKitchen.kitchenId)
            }  catch(err){
                console.log(err);
              }
            }else{
                const orderItemIdMaking = orderSperationToKitchen.map(item => item.orderItemId);
                // console.log("here is the:"+orderItemIdMaking)
                // console.log(orderItem);
                const remaingOrderItemId= orderItem.filter(item => !orderItemIdMaking.includes(item.id))
                if(remaingOrderItemId.length==orderItem.length){
                    console.log("No kitchen can fulfill any of the order items.");
                }else{
                await orders.findByIdAndUpdate(orderId,{
                    $set:{
                            orderCookIDDetails:orderSperationToKitchen,
                            orderCookIDDetailsOriginal:orderSperationToKitchen,
                            remaingOrderItemId:remaingOrderItemId,
                            orderStatus:'assignedToCookPartially',
                        }
              });
              console.log("cook id"+orderSperationToKitchen)
            }
          }
        }   
        }catch(err){
            console.log(err); 
        }
    }  
const processRejectedOrder=async(order)=>{
    try{
        console.log("Processing rejected order");
        const orderId=(order._id).toString();
        const customerLocation = order.deliveryInfo.deliveryLocation;
        const cooks=await availableCook(customerLocation, orderId);
        if(cooks.length==0){
            return console.log("can't find cook near us");
        }
        const cook= await loadBalancer(cooks);
       if(cook) {
            console.log("cook with least active orders found");
            const userId= await orders.findById(orderId,{_id:0,userId:1});
            // const orderItems= await orders.findById(orderId,{_id:0,orderedItem:1});
            const orderItem=order.remaingOrderItemId;
            const orderSperationToKitchen=[];
            const assignedOrderItemIds = new Set();

            // available cook sabai check gayerw going thrg it
            for(let i=0;i<cook.length;i++){
                if(cook[i].kitchenDetails.kitchenID.toString()===userId.userId){
                    console.log("skiping");
                    continue;
                }
            const cookId=cook[i].kitchenDetails.kitchenID.toString();
            const cookFoodItem= await user.findById(cookId,{_id:0,cookFoodItem:1})
            const cookFoodItemArray= Object.keys(cookFoodItem.cookFoodItem);

            //yeta chai order gareko item herni ani checking one by one
            for(let k=0; k<orderItem.length; k++){
                // console.log(assignedOrderItemIds);
                if (assignedOrderItemIds.has(orderItem[k].id)) {
                    console.log("skip item");
                    continue;
                }

                //aba chai cook le banauna sakni fooditem ra order item check garni
                for(let j=0;j<cookFoodItemArray.length;j++){
                
                    if(orderItem[k].id===cookFoodItem.cookFoodItem[cookFoodItemArray[j]]){
                        console.log("here");
                        orderSperationToKitchen.push({
                            orderItemId: orderItem[k].id,
                            kitchenId:cookId
                        });
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
            try{
                await orders.findByIdAndUpdate(orderId,{
                $set:{
                        orderCookIDDetails: [...(order.orderCookIDDetails || []), ...orderSperationToKitchen],
                        orderCookIDDetailsOriginal:[...(order.orderCookIDDetails || []), ...orderSperationToKitchen],
                        // orderCookIDDetails:orderSperationToKitchen,
                        orderStatus:'assignedToCook',
                        remaingOrderItemId: [],
                        partiallyRejectedOrder:[]
                    }
          });
          console.log("Rejected order reassigned completely.");

        //   console.log("your order has been placed to "+orderSperationToKitchen.kitchenId)
        }  catch(err){
            console.log(err);
          }
        }else{
            const orderItemIdMaking = orderSperationToKitchen.map(item => item.orderItemId);
            const remaingOrderItemId= orderItem.filter(item => !orderItemIdMaking.includes(item.id))
            if(remaingOrderItemId.length==orderItem.length){
                console.log("No kitchen can fulfill any of the order items.");
            }else{
            await orders.findByIdAndUpdate(orderId,{
                $set:{
                    orderCookIDDetails: [...(order.orderCookIDDetails || []), ...orderSperationToKitchen],
                    remaingOrderItemId: remainingOrderItemId,
                    orderStatus: 'assignedToCookPartially'
                        // orderCookIDDetails:orderSperationToKitchen,
                        // remaingOrderItemId:remaingOrderItemId,
                        // orderStatus:'assignedToCookPartially',
                    }
          });
          console.log("Rejected order reassigned partially.");
        }
      }
    }   
    }catch(err){
        console.log(err); 
    }
}

const fetchOrders=async()=>{
    console.log("checking orders")
    const order=await orders.find({orderStatus:{$in: ["assignedToCookPartially", "processedWithPayment"]},
        paymentStatus:"paid",
    }/*,{ scheduledTime:1,deliveryInfo:1}*/);
    if(order && order.length){
        
      for(let i=0;i<order.length;i++){
           const dateFormat = "dd/MM/yyyy, HH:mm:ss";
           const currentDate=new Date();
        //    const currentDate = format(new Date(), dateFormat);
           console.log(currentDate)
        //    const scheduledTime=await parse(order[i].scheduledTime, dateFormat, new Date());
           const scheduledTime = new Date(order[i].scheduledTime);
           console.log(scheduledTime);
           if(scheduledTime<=currentDate){
            console.log("here at scheduled");
            console.log(order[i].remaingOrderItemId);
            if(order[i].orderStatus==="processedWithPayment"){
                console.log("here at  new order")
                assignCookOrder(order[i]);
            }else if(order[i].orderStatus==="assignedToCookPartially" && 
                order[i].remaingOrderItemId.length>0/*&&
                  order[i].rejectedCookId.length>0*/){
                    console.log("here at  rejected order")
                    processRejectedOrder(order[i]);
                 }
        }
    }
}else{
    console.log("no order");
}
}
module.exports=fetchOrders;

 