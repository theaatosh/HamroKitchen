const mongoose=require("mongoose");
const { type } = require("os");

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
    orderCookIDDetails:{
        type:Array,
        default:[],
    },
    orderCookIDDetailsOriginal:{
        type:Array,
        default:[],
    },
    remaingOrderItemId:{
        type:Array,
        default:[],
    },
    rejectedCookId:{
        type:Array,
        default:[],
    },
    partiallyCompletedOrderID:{
        type:Array,
        default:[],
    },
    partiallyAcceptedOrderID:{
        type:Array,
        default:[],
    },
    partiallyRejectedOrder:{
        type:Array,
        default:[],
    }


});
const order=mongoose.model("Orders", orderSchema );

module.exports=order;