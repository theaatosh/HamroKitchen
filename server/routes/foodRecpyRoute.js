const express=require('express');
const {foodRec}=require("../controllers/foodRecpy");
const verifyToken = require('../middleWare/verifyToken');
const router = express.Router();
   
router.get('/',verifyToken, foodRec);


module.exports=router;