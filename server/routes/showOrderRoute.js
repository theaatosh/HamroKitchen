const express=require('express');
const router=express.Router();

const verifyToken=require('../middleWare/verifyToken');
const showOrder=require('../controllers/showOrderKitchen');

router.get('/',verifyToken,showOrder)

module.exports=router;