const express=require('express');
const router=express.Router();

const recFood=require('../controllers/recFood');
const verifyToken=require('../middleWare/verifyToken')

router.post('/',verifyToken, recFood);

module.exports=router;