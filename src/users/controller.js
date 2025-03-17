
  // const userModel=require('../../models/user')
  // const verificationModel=require('../../models/verification')
  // const bcrypt = require('bcrypt');
  // const nodemailer = require("nodemailer");
  // const bodyParser = require("body-parser");
  // const OTPVerificationModel=require('../../models/otpVerification')
  // const jwt = require('jsonwebtoken');
  // const secretKey = "QWERTYUIOIUYTREWQ#$%^&^%$#$%^&YTGVBHDER%^YGB"; // Replace with a strong secret key and keep it secure
  // require('dotenv').config()
  // const passport = require('passport');
  // const crypto = require('crypto');


  // // []]
  // // Passport Configuration
  // // passport.use(
  // //   new GoogleStrategy(
  // //     {
  // //       clientID: process.env.GOOGLE_CLIENT_ID,
  // //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // //       callbackURL: '/auth/google/callback',
  // //     },
  // //     async (accessToken, refreshToken, profile, done) => {
  // //       try {
  // //         // Check if user exists
  // //         let user = await userModel.findOne({ googleId: profile.id });

  // //         if (!user) {
  // //           // Create new user
  // //           user = await userModel.create({
  // //             useruuid: profile.id,
  // //             name: profile.displayName,
  // //             email: profile.emails[0].value,
  // //             picture: profile.photos[0].value,
  // //           });
  // //         }
  // //         console.log(profile);

  // //         done(null, user);
  // //       } catch (err) {
  // //         done(err, null);
  // //       }
  // //     }
  // //   )
  // // );
  // // passport.serializeUser((user, done) => done(null, user.id));
  // // passport.deserializeUser(async (id, done) => {
  // //   const user = await userModel.findById(id);
  // //   done(null, user);
  // // });

  // class User{

  //     getAllUser=async(req,res)=>{
  //         const users = await userModel.findAll(); 
  //         res.status(200).json(users);
  //     }

  //     verifyUser =async(req,res)=>{
  //       const {email}=req.query;
  //       const user =await userModel.findOne({
  //         where:{email}
  //       })
  //       if(user){
  //         return res.status(204).json({message:"user already exists"})
  //       }
  //       else{
  //         return res.status(201).json({message:'No such user exists'})
  //       }
  //     }
  //     createUser = async (req, res) => {
  //         try {
  //           const { email } = req.body;
  //           const user = await userModel.findOne({
  //             where: { email },
  //           });
        
  //           if (user) {
  //             return res.status(409).json({ message: 'User already exists with this email' });
  //           }
        
  //           // Create the user
  //           const newUser = await userModel.create(req.body);
          
  //           const data = {
  //             email:newUser.email,
  //             useruuid: newUser.useruuid,
  //             password_hash: newUser.password,  // Ensure that password is hashed before storing (if needed)
  //           };

  //           // Create the verification record
  //           await verificationModel.create(data);
        
  //           // Send success response only once
  //           return res.status(201).json({ message: 'User created successfully!', user: newUser });
        
  //         } catch (error) {
  //           // Handle any error that occurs during the process
  //           console.error(error);
  //           return res.status(500).json({ error: 'Failed to create user.', details: error.message });
  //         }
  //       };
        
  //   login = async (req, res) => {
  //   const { email, password } = req.body;

  //   try {
  //     // Find the user by email
  //     const user = await verificationModel.findOne({
  //       where: { email },
  //     });

      
      
  //     // If user doesn't exist
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }

  //     // Compare the input password with the hashed password from the database
  //     const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }

  //     // Generate a JWT token
  //     const token = jwt.sign(
  //       { useruuid: user.useruuid, email: user.email }, // Payload
  //       secretKey, // Secret key
  //       { expiresIn: '1h' } // Token expiration time
  //     );

  //     // Return the token and success message
  //     return res.status(200).json({ message: 'Login successful', token });

  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'An error occurred while logging in', details: error.message });
  //   }
  // };

      

  //       sendOTP=async(req,res)=>{
  //         const generateOTP = () => {
  //           return Math.floor(1000 + Math.random() * 9000); // 6-digit OTP
  //         };
  //         const { email } = req.body;

  //         if (!email) {
  //           return res.status(400).json({ error: "Email is required!" });
  //         }
  //         const otp = generateOTP();


  //         const transporter = nodemailer.createTransport({
  //           service: "gmail",
  //           auth: {
  //             user: "sudarsanamg762004@gmail.com", // Your email
  //             pass: "adte qfgg tpun rxux", // Your email password or app password
  //           },
  //         });

  //         const mailOptions = {
  //           from: process.env.EMAIL,
  //           to: email,
  //           subject: "Your OTP Code",
  //           text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  //         };


  //         transporter.sendMail(mailOptions, async(err, info) => {
  //           if (err) {
  //             console.error("Error sending email:", err);
  //             return res.status(500).json({ error: "Failed to send OTP!" });
  //           }
  //           const data={
  //             email:email,
  //             otp:otp
  //           } 
  //           await OTPVerificationModel.create(data);
        
  //           res.status(200).json({ message: "OTP sent successfully!" });
  //         });
          
  //       }


  //       verifyOtp = async (req, res) => {
  //         const { email, enteredOtp } = req.body;
  //         try {
  //           // Retrieve the latest OTP for the email
  //           const latestOtpRecord = await OTPVerificationModel.findOne({
  //             where: { email },
  //             order: [['created_at', 'DESC']], // Order by most recent
  //           });

          
        
        
  //           // If no OTP is found for this email
  //           if (!latestOtpRecord) {
  //             return res.status(404).json({ success: false, message: 'No OTP found for this email' });
  //           }

        
  //           const { otp, expires_at, isVerified } = latestOtpRecord;

        
  //           // Check if the OTP is already verified
  //           if (isVerified === true || isVerified === 'true') {
  //             return res.status(400).json({ success: false, message: 'OTP already verified' });
  //           }
        
  //           // Check if the OTP has expired
  //           else if (new Date() > new Date(expires_at)) {
  //             return res.status(400).json({ success: false, message: 'OTP has expired' });
  //           }
        
  //           // Check if the entered OTP matches
  //           else if (otp === parseInt(enteredOtp)) {
  //             // Update the record as verified

  //             await latestOtpRecord.update({ isVerified: true });
  //             return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  //           }
  //           else{
  //             return res.status(400).json({ success: false, message: 'Invalid OTP' });
  //           }
  //         } catch (error) {
  //           console.error('Error verifying OTP:', error);
  //           return res.status(500).json({ success: false, message: 'An error occurred' });
  //         }
  //       };

  //       createUserOAuth =async(req,res)=>{


  //         try {
  //         const {body} =req;
  //         const randomBytes = crypto.randomBytes(8);
  //         const password = randomBytes.toString('base64').slice(0, length);
  //         const data ={
  //           ...body,
  //           password:password
  //         }
  //         const newUser = await userModel.create(data);
          
  //         const Verifydata = {
  //           email:newUser.email,
  //           useruuid: newUser.useruuid,
  //           password_hash: newUser.password, 
  //         };

  //         await verificationModel.create(Verifydata);
      
  //         return res.status(201).json({ message: 'User created successfully!', user: newUser });

                
  //       } catch (error) {
  //         return res.status(500).json({ 
  //           message: 'An error occurred while creating the user.', 
  //           error: error.message 
  //       });

  //       }
      


  //       }

        
        


        
        
  // }


  // module.exports=new User();


const userModel = require("../../models/user");
const verificationModel = require("../../models/verification");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const OTPVerificationModel = require("../../models/otpVerification");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


const secretKey = "QWERTYUIOIUYTREWQ#$%^&^%$#$%^&YTGVBHDER%^YGB"; // Replace with a strong secret key
require("dotenv").config();

class User {
  getAllUser = async (req, res) => {
    try {
      const users = await userModel.find(); // MongoDB uses `find()`
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  };

  // ✅ Check if a user exists
  verifyUser = async (req, res) => {
    console.log('user verify hitted');
    const { email } = req.query;
    console.log(email);
    const user = await userModel.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(204).json({ message: "User already exists" });
    } else {
      return res.status(201).json({ message: "No such user exists" });
    }
  };

  getUser = async (req, res) => {

    try {
    const {token} = req.query;
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64)); 
    let user = await userModel.findOne({ email: decodedPayload.email });

    user ={
      userUuid: user.userUuid,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName:  user.nickName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      dob: user.dob, 
      gender: user.gender,
      rating :user.rating,
      totalCalls :user.totalCalls,
      isActive :user.isActive,
      starRating:user.starRating,
      language:user.language,
    }

    return res.status(200).json({ user });
        
  } catch (error) {
      return res.status(500).json({ error: "Failed to fetch user", details: error.message });
  }
    
  }

  createUser = async (req, res) => {
    console.log('hitted create user');
    try {
      const body = req.body.body;
      const password = body.password;
      delete body.password;

      const hashedPassword = await bcrypt.hash(password, 10);
      const userUuid = uuidv4();

      const newUser = new userModel({
         ...body,
          userUuid: userUuid,
        });
        console.log(newUser);
      await newUser.save();


      await verificationModel.create({
        email: newUser.email,
        userUuid: newUser.userUuid,
        password_hash: hashedPassword,
      });

      return res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user.", details: error.message });
    }
  };
  

  // ✅ User login
  login = async (req, res) => {
    console.log(req.body);
    const { email , password } = req.body;
  
    try {
      const user = await verificationModel.findOne({ email });
      console.log(user)

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      console.log(isPasswordValid)
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userUuid: user.userUuid, email: user.email }, secretKey);

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ error: "Login error", details: error.message });
    }
  };

  // ✅ Send OTP via email
  sendOTP = async (req, res) => {
    const generateOTP = () => Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

    const { email } = req.body;
    console.log('**************',email)
    if (!email) return res.status(400).json({ error: "Email is required!" });

    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sudarsanamg762004@gmail.com", // Your email
        pass: "adte qfgg tpun rxux", // Your email password or app password
      },
    });

    const mailOptions = {
      from: "sudarsanamg762004@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to send OTP!" });
      }

      await OTPVerificationModel.create({ email,OTP: otp });

      res.status(200).json({ message: "OTP sent successfully!" });
    });
  };

  // ✅ Verify OTP
  verifyOtp = async (req, res) => {
    console.log('hitted verify otp')
    const { email, enteredOtp } = req.body;
    console.log(req.body);
    try {
      const latestOtpRecord = await OTPVerificationModel.findOne({ email }).sort({ createdAt: -1 });
      console.log(latestOtpRecord)

      if (!latestOtpRecord) {
        return res.status(404).json({ success: false, message: "No OTP found for this email" });
      }

      if (latestOtpRecord.isVerified) {
        return res.status(400).json({ success: false, message: "OTP already verified" });
      }

      if (latestOtpRecord.OTP === parseInt(enteredOtp)) {
        console.log('hitted verify otp')
        await OTPVerificationModel.updateOne({ email }, { isVerified: true });


        return res.status(200).json({ success: true, message: "OTP verified successfully" });
      } else {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error verifying OTP", error: error.message });
    }
  };

  updateLanguage = async (req, res) => {
    try {
      const {uuid , language} = req.body;
      console.log(req.body)


      const user = await userModel.findOne({ userUuid:uuid });

      user.updateOne({ language }).then(() => {
        res.status(200).json({ message: "Language updated successfully" });
      })



    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error updating language", error: error.message });
    }
  }

  feedback =async(req,res)=>{
    try {
        const { userUuid, type } = req.body;

        if (!userUuid || !type) {
            return res.status(400).json({ message: "userUuid and feedback type are required." });
        }

        const user = await userModel.findOne({ userUuid });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // If feedback is positive, increase rating and total calls
        if (type === "like") {
            user.rating += 5; // Increment rating
            user.totalCalls += 1;
        } else {
            user.totalCalls += 1;
            user.rating -= 5; 
            user.isActive = false;
        }

        await user.save();

        setTimeout(async () => {
            await user.updateOne({ userUuid }, { isActive: true });
            console.log(`User ${userUuid} has been reactivated.`);
        }, 10 * 60 * 1000); // 10 minutes

        res.status(200).json({
            message: "Feedback submitted successfully.",
            user: {
                userUuid: user.userUuid,
                rating: user.rating,
                totalCalls: user.totalCalls,
            },
        });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};


  

  // ✅ OAuth User Creation (Google/Facebook)
  createUserOAuth = async (req, res) => {
    try {
      const { body } = req;
      const randomBytes = crypto.randomBytes(8);
      const password = randomBytes.toString("base64").slice(0, 12); // 12-char random password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({ ...body, password: hashedPassword });
      await newUser.save();

      await verificationModel.create({
        email: newUser.email,
        useruuid: newUser.userUuid,
        password_hash: hashedPassword,
      });

      return res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: "Error creating user.", error: error.message });
    }
  };


  forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    else
    {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userModel
        .updateOne({ email }, { password: hashedPassword })
        .then(() => {
          res.status(200).json({ message: "Password updated successfully" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error updating password", error: error.message });
        });
      }
    };


    updateUser = async (req, res) => {
      const { userUuid } = req.body;

      console.log(req.body)

      try {
      const user = await userModel.findOne({
        userUuid,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }


      const updatedUser = await userModel
        .updateOne({ userUuid }, { ...req.body })
        .then(() => {
          res.status(200).json({ message: "User updated successfully" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error updating user", error: error.message });
        });
    }

        
   catch (error) {
        
  }
};

}

module.exports = new User();
