const express = require('express');
const router = express.Router();
const addItemsPage=require("../controllers/addItemsPage.js");

router.post('/', addItemsPage.upload.single("image") , addItemsPage.addItemsPage );

module.exports=router;