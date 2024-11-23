const express = require('express');
const router = express.Router();
const dashboard=require("../controllers/adminDashboard");

router.get('/', dashboard);

module.exports=router;