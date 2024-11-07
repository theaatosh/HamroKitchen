const express=require('express');
const router=express.Router();

const verifyToken=require('../middleWare/verifyToken');
const {showOrder, acceptOrder, rejectOrder, processingOrder}=require('../controllers/showOrderKitchen');

router.get('/showOrder', verifyToken,showOrder);
router.post('/acceptOrder', verifyToken, acceptOrder );
router.post('/rejectOrder', verifyToken, rejectOrder );
router.get('/processingOrder', verifyToken,processingOrder);


module.exports=router;