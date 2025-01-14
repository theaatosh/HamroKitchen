const express=require('express');
const cod=require('../controllers/cod.js');
const verifyToken = require('../middleWare/verifyToken');
const router = express.Router();

try{
    router.post('/',verifyToken, cod);
}catch(err){
    console.log(err);
}
module.exports=router;