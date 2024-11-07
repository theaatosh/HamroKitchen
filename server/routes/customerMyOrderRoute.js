const express=require('express');
const router=express.Router();
const myOrder=require('../controllers/customerMyOrder');
const verifyToken = require('../middleWare/verifyToken');

router.get('/',verifyToken,myOrder);

module.exports=router;