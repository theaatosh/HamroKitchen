const user = require("./models/index");

async function findKitchenWithLeastNumOfOrder(nearestKitchenArray) {
  // let kitchenName = null;
  // let lowestScore = 10000;
  console.log("neareastKitchenArray:"+nearestKitchenArray);
  const kitchenWithScore = [];
  if (nearestKitchenArray.length > 0) {
    for (let i = 0; i < nearestKitchenArray.length; i++) {
      const cookId = nearestKitchenArray[i].kitchenID;
      const cook = await user.findById(cookId);
      if (cook.activeOrders >= cook.weighted) {
        continue;
      }
      const score = cook.activeOrders / cook.weighted;
      kitchenWithScore.push({
        kitchenDetails: nearestKitchenArray[i],
        score: score,
      });

      // if (score < lowestScore) {
      //     lowestScore = score;
      //     kitchenName = nearestKitchenArray[i];
      // }
    }
    kitchenWithScore.sort((a, b) => a.score - b.score);
    console.log(kitchenWithScore);
    return kitchenWithScore;
  } else {
    console.log("No kitchen is active");
  }
}

module.exports = findKitchenWithLeastNumOfOrder;
