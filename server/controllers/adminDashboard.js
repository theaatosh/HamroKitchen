const order=require('../models/orderModel');
const user=require('../models/index');
const foodItem=require('../models/adminAddItem')
const mongoose=require('mongoose');
const dashboard=async(req,res)=>{
    try{
        let amount=0;
        const orders= await order.find();
        if(orders && orders.length>0){
            for(i=0;i<orders.length;i++){
                amount+=orders[i].totalAmount;
            }
        }
        let avgAmount=amount/orders.length;
        const totalOrders= await order.countDocuments();
        const totalOrdersCompleted= await order.countDocuments({orderStatus:"completed"})
        const totalPendingOrders=await order.countDocuments({orderStatus:"processing"})
        const totalAssignedOrders=await order.countDocuments({orderStatus:"assignedToCook"})
        const totalUsers= await user.countDocuments();
        // const totalCustomer= await user.countDocuments({role:"customer"})+ await user.countDocuments({role:"pending"});
        const totalCustomer = await user.countDocuments({
            role: { $in: ["customer", "pending"] }
          });
        const totalKitchen= await user.countDocuments({role:"kitchen"});
        const totalFoodItems= await foodItem.countDocuments();
        res.status(200).json({
            totalAmount:amount,
            totalOrders:totalOrders,
            totalUsers:totalUsers,
            totalCustomer:totalCustomer,
            totalKitchen:totalKitchen,
            totalOrdersCompleted:totalOrdersCompleted,
            totalPendingOrders:totalPendingOrders,
            totalAssignedOrders:totalAssignedOrders,
            totalFoodItems:totalFoodItems,
            averageAmount:avgAmount,
        })
    }catch(err){
        console.log(err);
        res.status(500).send("server error"+err);
    }
}
module.exports=dashboard;