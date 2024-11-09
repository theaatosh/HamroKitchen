const express = require('express');
const router = express.Router();
const editItem=require("../controllers/adminEditItem");

router.post('/',  editItem );

module.exports=router;