const user=require('../models/index')
const users=async(req,res)=>{
try{
    const customer=await user.find({role:"customer"});
    const kitchen=await user.find({role:"kitchen"});
    if(customer && kitchen){
        console.log(kitchen)
        console.log("THis is kitchen:")
        console.log(customer)

        res.status(200).json({ customers: customer, kitchens: kitchen });
    }else if(!kitchen && !customer){
        res.status(400).json({message:"no user to show"});
    }else if(customer && !kitchen){
        res.status(201).json({ customers: customer, message: "No kitchens available" });
    }
    }catch(err){
    console.log(err);
     }
}
module.exports=users;