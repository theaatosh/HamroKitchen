const express=require('express');
const router=express.Router();

const{forgetPassword,verifyOTP,changePassword}=require('../controllers/password');

router.post('/forgetPassword',forgetPassword);
router.post('/verifyOTP',verifyOTP);
router.post('/changePassword',changePassword);

module.exports=router;

