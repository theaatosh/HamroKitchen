const express = require('express');
const router = express.Router();
const paymentVerify=require("../controllers/paymentVerify");
const verifyToken=require('../middleWare/verifyToken');



router.post('/',verifyToken, paymentVerify);



module.exports=router;