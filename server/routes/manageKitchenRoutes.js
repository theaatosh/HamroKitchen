const express = require('express');
const router = express.Router();
const {manageKitchen,updateStatusRight}=require("../controllers/manageKitchen");

router.get('/', manageKitchen );

router.post('/updateStatus', updateStatusRight);

module.exports=router;