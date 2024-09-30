const express = require('express');
const router = express.Router();
const {manageKitchen,updateStatusRight,updateStatusWrong}=require("../controllers/manageKitchen");

router.get('/', manageKitchen );

router.post('/updateStatusRight', updateStatusRight);
router.post('/updateStatusWrong', updateStatusWrong);


module.exports=router;