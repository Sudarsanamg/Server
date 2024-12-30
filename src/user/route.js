const express = require('express');

const router = express.Router();

const userController = require('./controller');
const hitLimiter = require('../../middleware/hitLimiter');

//get

router.get('/get-all-user',userController.getAllUser)
router.get('/verify-user',userController.verifyUser)

//post

router.post('/create-user',userController.createUser)
router.post('/login',userController.login)
router.post('/send-otp',hitLimiter,userController.sendOTP)
router.post('/verify-otp',userController.verifyOtp)

//for forgot password we need mail verification




module.exports=router;

