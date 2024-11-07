const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    userId:{type:String},
    orderedItem:{
        type:Array,
    },
    totalAmount:{
        type:Number,
    },
    deliveryFee:{type:String},
    scheduledTime:{type:String},
    orderStatus:{type:String,
        default:"Onprocess"
    },
    // deliveryAddress:{
    //     type:Object,
    //     default:{
    //         lat:"",
    //         lon:"",
    //     }
    // },
    deliveryInfo:{
        type:Object,
    },
    paymentStatus:{type:String,
        default:"notPaid"
    },
    paymentMode:{
        type:String,
    },
    paymentDetails:{
        type:Object,
    },
    cookId:{
        type:String
    },
    rejectedCookId:{
        type:String,
    },

});
const order=mongoose.model("Orders", orderSchema );

module.exports=order;