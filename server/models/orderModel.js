const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    userId:{type:String},
    orderedItem:{
        type:Array,
    },
    totalAmount:{
        type:Number,
    },
    scheduledTime:{type:String},
    orderStatus:{type:String,
        default:"Onprocess"
    },
    deliveryAddress:{
        type:Object,
        default:{
            lat:"",
            lon:"",
        }
    },
    paymentStatus:{type:String,
        default:"notPaid"
    },
    paymentMode:{
        type:String,
    }
});
const order=mongoose.model("Orders", orderSchema );

module.exports=order;