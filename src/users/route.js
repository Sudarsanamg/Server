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
router.post('/updateLanguage',userController.updateLanguage)

// router.post("/feedback", async (req, res) => {
//     try {
//         const { userUuid, type } = req.body;

//         if (!userUuid || !type) {
//             return res.status(400).json({ message: "userUuid and feedback type are required." });
//         }

//         const user = await User.findOne({ userUuid });

//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // If feedback is positive, increase rating and total calls
//         if (type === "like") {
//             user.rating += 5; // Increment rating
//             user.totalCalls += 1;
//         } else {
//             user.totalCalls += 1;
//             user.rating -= 5; 
//         }

//         await user.save();

//         setTimeout(async () => {
//             await user.updateOne({ userUuid }, { isActive: true });
//             console.log(`User ${userUuid} has been reactivated.`);
//         }, 10 * 60 * 1000); // 10 minutes

//         res.status(200).json({
//             message: "Feedback submitted successfully.",
//             user: {
//                 userUuid: user.userUuid,
//                 rating: user.rating,
//                 totalCalls: user.totalCalls,
//             },
//         });
//     } catch (error) {
//         console.error("Error submitting feedback:", error);
//         res.status(500).json({ message: "Internal Server Error." });
//     }
// });

//for forgot password we need mail verification


router.post('/feedback',userController.feedback)




router.put('/forgot-password',userController.forgotPassword)
router.put('/update-user',userController.updateUser)





module.exports=router;

