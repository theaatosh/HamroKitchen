const express = require('express');
const router = express.Router();
const kitchenSignUp=require("../controllers/kitchenSignUp");
const verifyToken = require('../middleWare/verifyToken');

router.post('/',verifyToken, kitchenSignUp );

module.exports=router;