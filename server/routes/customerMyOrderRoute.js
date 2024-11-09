const express=require('express');
const router=express.Router();
const {myOrder,customerProfile}=require('../controllers/customerMyOrder');
const verifyToken = require('../middleWare/verifyToken');

router.get('/myOrder',verifyToken,myOrder);
router.get('/customerProfile',verifyToken,customerProfile);


module.exports=router;