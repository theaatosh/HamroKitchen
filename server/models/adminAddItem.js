const mongoose=require('mongoose');
 
const foodItemSchema=mongoose.Schema({
    image:{type:String},
    productName:{type:String},
    productDescription:{type:String},
    productCategory:{type:String},
    productPrice:{type:Number},
});

const foodItemDetails=mongoose.model("foodItemDetails", foodItemSchema );

module.exports=foodItemDetails;