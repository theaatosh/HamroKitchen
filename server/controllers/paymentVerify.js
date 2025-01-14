const axios=require('axios');
const order=require("../models/orderModel");
const user=require('../models/index');
const paymentVerify=async(req,res)=>{
    try {
      
      console.log("hello");
      const {pidx}=req.body;
      const headers = {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          "https://a.khalti.com/api/v2/epayment/lookup/",
          { pidx },
          { headers }
        );
        if(response.data.status==="Completed"){
          const{userId}=req.user;
          const orderStatus='Onprocess'
          const alreadySaveOrder=await order.findOne({userId:userId, orderStatus:orderStatus});
          if(alreadySaveOrder!==null){
            const orderId=alreadySaveOrder._id.toString();
            try{
              await order.findOneAndUpdate({_id:orderId}, 
                {$set:{
                  orderStatus:"processedWithPayment",
                  paymentStatus:"paid",
                  paymentDetails:response.data,
                  paymentMode:"Khalti",
                }
                }, 
                { new: true }  
            );
            }catch(err){
              console.log("error while updating payment status"+err);
            }
            try{
              const h=await user.findOneAndUpdate({_id:userId}, 
                {$unset:{
                  cart:''
                }
                }, 
                { new: true }  
              );
            }catch(err){
              console.log("error while removing item from cart"+err)
            }
          }else{
            
          }
        }
        res.send(response.data); 
      
      } catch (err) {
        res.status(500).json({ error: err.message + "Failed to lookup payment" });
      }
}
module.exports=paymentVerify;