const express = require('express');
const   router = express.Router();
const {editItem,deleteItem}=require("../controllers/adminEditItem");

router.post('/edit',  editItem );
router.post('/delete',  deleteItem );

module.exports=router;