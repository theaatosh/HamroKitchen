const express=require('express');
const router=express.Router();

const scheduleOder=require("../controllers/scheduleOder");
const verifyToken = require('../middleWare/verifyToken');
router.post('/',verifyToken, scheduleOder);

module.exports=router;