const express = require('express');
const router = express.Router();
const kitchenSignUp=require("../controllers/kitchenSignUp");

router.post('/', kitchenSignUp );

module.exports=router;