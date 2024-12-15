const mongoose=require('mongoose');
 
const foodItemSchema=mongoose.Schema({
    image:{type:String},
    productName:{type:String},
    productDescription:{type:String},
    productCategory:{type:String},
    productPrice:{type:Number},
    foodType:{type:String},
    dietType:{type:String},
    spice:{type:String},

});

const foodItemDetails=mongoose.model("foodItemDetails", foodItemSchema );

module.exports=foodItemDetails;