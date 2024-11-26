const user= require("./models/index");
const order=require("./models/orderModel");
const mongoose=require('mongoose');
const { connectToMongoDB } = require("./connections/index");
require('dotenv').config();


function haversine(lat1,lon1, lat2,lon2){
    let lat=(lat1-lat2)*Math.PI/180;
    let lon=(lon1-lon2)*Math.PI/180;
    
    let a= Math.pow(Math.sin(lat/2),2) +
     Math.cos(lat1*Math.PI/180) *
     Math.cos(lat2*Math.PI/180) *
     Math.pow(Math.sin(lon/2),2);

    const r=6371;

    let d= 2*r* Math.asin(Math.sqrt(a));
    return(d*1000);
}

const findKitchen=async(customerLocation, orderId)=>{
    try{
        const kitchens= await user.find({role:"kitchen" , cookStatus:"online"});
        const nearestKitchenArray=[];
        // console.log(kitchens.length +"kitchens");

        for (let i = 0; i < kitchens.length; i++) {
            // customerLocation=await customerLocation
            // console.log("here");
            // console.log(i);
            const distance = haversine(customerLocation.lat,customerLocation.lng, kitchens[i].cookLocation.lat, kitchens[i].cookLocation.lng);
            const kitchenInfo ={
                // kitchens:kitchens[i],
                kitchenID:kitchens[i]._id,
                distance:distance
             };
            nearestKitchenArray.push(kitchenInfo);
        }
        nearestKitchenArray.sort((a, b) => a.distance - b.distance);
        // console.log("here"+nearestKitchenArray[0].kitchenID);
        let filteredKitchens=[];
         filteredKitchens=nearestKitchenArray;
        // console.log(filteredKitchens.length + "filteredKitchens")
    try{
        // const orderId=orderId;
        const rejectedCook= await order.findById(orderId,{_id:0,rejectedCookId:1});
        // console.log(typeof(rejectedCook));
        
        
        if(rejectedCook.rejectedCookId ){
             filteredKitchens = nearestKitchenArray.filter(
                (kitchenInfo) => !rejectedCook.rejectedCookId.includes(kitchenInfo.kitchens._id.toString())
              );
            //   console.log("here"+filteredKitchens[0].kitchenID);
            return  filteredKitchens;
        }else{
            // console.log("filteredKitchens"+filteredKitchens[0].kitchenID);
            return  filteredKitchens;
        }
    }catch(err){
        console.log("couldnt find order"+err);
    }
       
}
catch(err){
    console.log(err);
}}

// findKitchen()
//     .then(kitchen => console.log( kitchen))
//     .catch(err => console.error("Error finding kitchen:", err));

module.exports=findKitchen;