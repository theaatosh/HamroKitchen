const user=require('./models/index');

async function findKitchenWithLeastNumOfOrder(nearestKitchenArray){
    let kitchenName = null;
    let lowestScore = 10000;
    console.log(nearestKitchenArray.length);
    if(nearestKitchenArray.length>0){
        for(let i=0;i<nearestKitchenArray.length; i++){
        const cookId=nearestKitchenArray[i].kitchens._id;
        const cook= await user.findById(cookId);

       if (cook.activeOrders >= cook.weighted) {
        continue;
        }
        const score=cook.activeOrders/cook.weighted;
        // console.log(score);
        if (score < lowestScore) {
            lowestScore = score;
            kitchenName = nearestKitchenArray[i];
        }
    }
    // console.log(kitchenName);
    return kitchenName;
    }else{
        console.log("No kitchen is active")
    }
}

module.exports=findKitchenWithLeastNumOfOrder;