const user= require("./models/index");
const order=require("./models/orderModel");
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
        for (let i = 0; i < kitchens.length; i++) {
           
            const distance = haversine(customerLocation.lat,customerLocation.lng, kitchens[i].cookLocation.lat, kitchens[i].cookLocation.lng);
            const kitchenInfo ={
                kitchenID:kitchens[i]._id,
                distance:distance
             };
            nearestKitchenArray.push(kitchenInfo);
        }
        nearestKitchenArray.sort((a, b) => a.distance - b.distance);
        let filteredKitchens=[];
         filteredKitchens=nearestKitchenArray;
    try{
        const rejectedCook= await order.findById(orderId,{_id:0,rejectedCookId:1});       
        if (rejectedCook) {
            for (let rj = 0; rj < rejectedCook.rejectedCookId.length; rj++) {
                const rejectedCookId = rejectedCook.rejectedCookId;
                if (rejectedCookId) {
                    console.log(rejectedCookId)
                    console.log(filteredKitchens);
                    filteredKitchens = filteredKitchens.filter(kitchenInfo => 
                        !rejectedCookId.includes(kitchenInfo.kitchenID.toString())
                    );
                }
            }
        }
        const filteredKitchensDislessthan2000 = filteredKitchens.filter(kitchen => kitchen.distance < 500000);
        const filteredKitchensDisGreaterEqual2000 = filteredKitchens.filter(
            kitchen => kitchen.distance >= 2000
        );
        console.log(filteredKitchensDislessthan2000)
        return filteredKitchensDislessthan2000;

    }catch(err){
        console.log("couldnt find order"+err);
    }
       
}
catch(err){
    console.log(err);
}}

module.exports=findKitchen;