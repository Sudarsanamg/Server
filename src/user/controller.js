
const userModel=require('../../models/user')
const verificationModel=require('../../models/verification')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const OTPVerificationModel=require('../../models/otpVerification')
const jwt = require('jsonwebtoken');
const secretKey = "QWERTYUIOIUYTREWQ#$%^&^%$#$%^&YTGVBHDER%^YGB"; // Replace with a strong secret key and keep it secure
require('dotenv').config()
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Passport Configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          // Create new user
          user = await userModel.create({
            useruuid: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          });
        }
        console.log(profile);

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

class User{

    getAllUser=async(req,res)=>{
        const users = await userModel.findAll(); 
        res.status(200).json(users);
    }

    verifyUser =async(req,res)=>{
      const {email}=req.query;
      const user =await userModel.findOne({
        where:{email}
      })
      console.log(user)

      if(user){
        return res.status(204).json({message:"user already exists"})
      }
      else{
        return res.status(201).json({message:'No such user exists'})
      }
    }
    createUser = async (req, res) => {
        try {
          const { email } = req.body.formData;
          // Check if user already exists
          const user = await userModel.findOne({
            where: { email },
          });
      
          if (user) {
            return res.status(409).json({ message: 'User already exists with this email' });
          }
      
          // Create the user
          const newUser = await userModel.create(req.body.formData);
          const data = {
            email:newUser.email,
            useruuid: newUser.useruuid,
            password_hash: newUser.password,  // Ensure that password is hashed before storing (if needed)
          };

          // Create the verification record
          await verificationModel.create(data);
      
          // Send success response only once
          return res.status(201).json({ message: 'User created successfully!', user: newUser });
      
        } catch (error) {
          // Handle any error that occurs during the process
          console.error(error);
          return res.status(500).json({ error: 'Failed to create user.', details: error.message });
        }
      };
      
   login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await verificationModel.findOne({
      where: { email },
    });

    console.log(user)
    
    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the input password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { useruuid: user.useruuid, email: user.email }, // Payload
      secretKey, // Secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Return the token and success message
    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while logging in', details: error.message });
  }
};

     

      sendOTP=async(req,res)=>{
        const generateOTP = () => {
          return Math.floor(1000 + Math.random() * 9000); // 6-digit OTP
        };
        const { email } = req.body;

        if (!email) {
          return res.status(400).json({ error: "Email is required!" });
        }
        const otp = generateOTP();


        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sudarsanamg762004@gmail.com", // Your email
            pass: "adte qfgg tpun rxux", // Your email password or app password
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        };


        transporter.sendMail(mailOptions, async(err, info) => {
          if (err) {
            console.error("Error sending email:", err);
            return res.status(500).json({ error: "Failed to send OTP!" });
          }
          const data={
            email:email,
            otp:otp
          } 
          await OTPVerificationModel.create(data);
      
          res.status(200).json({ message: "OTP sent successfully!" });
        });
        
      }


      verifyOtp = async (req, res) => {
        const { email, enteredOtp } = req.body;
        try {
          // Retrieve the latest OTP for the email
          const latestOtpRecord = await OTPVerificationModel.findOne({
            where: { email },
            order: [['created_at', 'DESC']], // Order by most recent
          });

         
       
      
          // If no OTP is found for this email
          if (!latestOtpRecord) {
             return res.status(404).json({ success: false, message: 'No OTP found for this email' });
          }

      
          const { otp, expires_at, isVerified } = latestOtpRecord;

      
          // Check if the OTP is already verified
          if (isVerified === true || isVerified === 'true') {
            return res.status(400).json({ success: false, message: 'OTP already verified' });
          }
      
          // Check if the OTP has expired
          else if (new Date() > new Date(expires_at)) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
          }
      
          // Check if the entered OTP matches
          else if (otp === parseInt(enteredOtp)) {
            // Update the record as verified

            await latestOtpRecord.update({ isVerified: true });
            return res.status(200).json({ success: true, message: 'OTP verified successfully' });
          }
          else{
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
          }

         
      
          
        } catch (error) {
          console.error('Error verifying OTP:', error);
          return res.status(500).json({ success: false, message: 'An error occurred' });
        }
      };


      
      


      
      
}


module.exports=new User();