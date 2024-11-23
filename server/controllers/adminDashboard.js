const order=require('../models/orderModel');
const user=require('../models/index');
const dashboard=async(req,res)=>{
    try{
        let amount=0;
        const orders= await order.find();
        if(orders && orders.length>0){
            for(i=0;i<orders.length;i++){
                amount+=orders[i].totalAmount;
            }
        }
        const totalOrders= await order.countDocumnets();
        const totalOrdersCompleted= await order.countDocumnets({orderStatus:"completed"})
        const totalPendingOrders=await order.countDocumnets({orderStatus:"processing"})
        const totalUsers= await user.countDocumnets();
        const totalCustomer= await user.countDocumnets({role:"customer"});
        const totalKitchen= await user.countDocumnets({role:"kitchen"});

        res.status(200).json({
            totalAmount:amount,
            totalOrders:totalOrders,
            totalUsers:totalUsers,
            totalCustomer:totalCustomer,
            totalKitchen:totalKitchen,
            totalOrdersCompleted:totalOrdersCompleted,
            totalPendingOrders:totalPendingOrders,
        })
    }catch(err){
        console.log(err);
        res.status(500).send("server error"+err);
    }
}
module.exports=dashboard;