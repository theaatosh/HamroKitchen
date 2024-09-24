const express=require('express');
const {addToCart, removeFromCart, getCart}=require('../controllers/cartController');
const verifyToken = require('../middleWare/verifyToken');
const router = express.Router();

try{
    router.post('/add', verifyToken, addToCart);
    router.post('/remove' ,verifyToken, removeFromCart);
    router.get('/get',verifyToken, getCart);
}catch(err){
    console.log(err);
}
module.exports=router;