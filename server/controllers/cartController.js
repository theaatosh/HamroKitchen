const user = require("../models/index");
const mongoose=require("mongoose");

//add items to cart
const addToCart=async (req,res)=>{
    // console.log("hi");

   try{
        let userData= await user.findById(req.user.userId);
        let cartData= await userData.cart;
        if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
        }else{
        cartData[req.body.itemId]+=1;
        }
        await user.findByIdAndUpdate(req.user.userId, {cart:cartData});
        // console.log("added to cart");
        res.send("Added to cart");
    }catch(err){
        console.log(err);
        res.send("Error!");
        }
}


//remove items from the cart
const removeFromCart=async (req,res)=>{
    try{
        let userData= await user.findById(req.user.userId);
        let cartData= await userData.cart;
        if(cartData[req.body.itemId]>1)
            {
            cartData[req.body.itemId]-=1;
            await user.findByIdAndUpdate(req.user.userId, {cart:cartData});
        }
        else if (cartData[req.body.itemId]==1){
            await user.findByIdAndUpdate(req.user.userId, {
            
            $unset: { [`cart.${req.body.itemId}`]:0}  // Remove the item from the cart
            });
        
        }

        // console.log("removed");
        res.send("removed from cart");
    }catch(err){
        console.log("Error1");
    }

}

//fetch cart data
const getCart=async (req,res)=>{    
    try{    
        let userData= await user.findById(req.user.userId);
        let cartData= await userData.cart;
        res.json({cartData});
    }catch(err){
        console.log("Error!");
    }
}


module.exports={addToCart, removeFromCart, getCart} ;