const express=require('express');
const router=express.Router();

const verifyToken=require('../middleWare/verifyToken');
const {showOrder, acceptOrder, rejectOrder, processingOrder, getKitchenOnline, completeOrder, showCompletedOrder }=require('../controllers/showOrderKitchen');

router.get('/showOrder', verifyToken,showOrder);
router.post('/acceptOrder', verifyToken, acceptOrder );
router.post('/rejectOrder', verifyToken, rejectOrder );
router.get('/processingOrder', verifyToken,processingOrder);
router.post('/getKitchenOnline', verifyToken, getKitchenOnline );
router.post('/completeOrder', verifyToken, completeOrder);
router.get('/showCompletedOrder', verifyToken, showCompletedOrder);



module.exports=router; 