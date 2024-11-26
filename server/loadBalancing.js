const user=require('./models/index');

async function findKitchenWithLeastNumOfOrder(nearestKitchenArray){
    // let kitchenName = null;
    // let lowestScore = 10000;
    const kitchenWithScore=[];
    // console.log(nearestKitchenArray.length);
    if(nearestKitchenArray.length>0){
        for(let i=0;i<nearestKitchenArray.length; i++){
        // const cookId=nearestKitchenArray[i].kitchens._id;
        const cookId=nearestKitchenArray[i].kitchenID;
            // console.log("here")
        const cook= await user.findById(cookId);
        // console.log("found"+cook)

       if (cook.activeOrders >= cook.weighted) {
        continue;
        }
        const score=cook.activeOrders/cook.weighted;
        // console.log(score);
        kitchenWithScore.push({
            kitchenDetails:nearestKitchenArray[i],
            score:score
        })
        kitchenWithScore.sort((a,b)=> a.score - b.score);

        // if (score < lowestScore) {
        //     lowestScore = score;
        //     kitchenName = nearestKitchenArray[i];
        // }
    }
    // console.log(kitchenName);
    // return kitchenName;
    // console.log(kitchenWithScore);
    return kitchenWithScore;
    }else{
        console.log("No kitchen is active")
    }
}

module.exports=findKitchenWithLeastNumOfOrder;