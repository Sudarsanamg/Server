const express = require('express');

const router = express.Router();

const userController = require('./controller');
const hitLimiter = require('../../middleware/hitLimiter');

//get
console.log("hitted");

router.get('/get-all-user',userController.getAllUser)
router.get('/verify-user',userController.verifyUser);
router.get('/me',userController.getUser)

//post

router.post('/create-user',userController.createUser)
router.post('/create-userVOAuth',userController.createUserOAuth)

// router.post('/edit-user',userController.editUser)
router.post('/login',userController.login)
router.post('/send-otp',userController.sendOTP)
router.post('/verify-otp',userController.verifyOtp)

//for forgot password we need mail verification

router.put('/forgot-password',userController.forgotPassword)
router.put('/update-user',userController.updateUser)





module.exports=router;

