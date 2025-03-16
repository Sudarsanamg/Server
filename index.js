const express = require('express');

const cors = require('cors');
const crypto=require('crypto')
require('dotenv').config()

const app = express();
const session = require('express-session');

const userRoutes=require('./src/users/route')
const hitLimiter =require('./middleware/hitLimiter')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



const userModel=require('./models/user');
const connectDB=require('./config/db')




app.use(express.json());
app.use(cors());

connectDB();


// passport.serializeUser((userObj, done) => {
//   done(null, userObj.user.id); // Serialize user ID
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id); // Adjust to match your ORM
//     if (!user) throw new Error("User not found during deserialization");
//     done(null, user); // Pass user object to `req.user`
//   } catch (err) {
//     done(err, null);
//   }
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await userModel.findOne({
//           where: { email: profile.emails[0].value },
//         });

//         const newUser = !user;

//         if (newUser) {
//           user = await userModel.create({
//             firstname: profile.displayName,
//             lastname: profile.name.familyName,
//             email: profile.emails[0].value,
//             profile_photo_url: profile.photos[0].value,
//             gender: 'other',
//             dob: '1960-01-01',
//             country: 'default',
//             password: crypto.randomBytes(32).toString('hex'),
//           });
//         }

//         done(null, { user, isNewUser: newUser }); // Pass user and state
//       } catch (err) {
//         console.log(err.message);
//         done(err, null);
//       }
//     }
//   )
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     const isNewUser = req.session.passport.user.isNewUser; // Access additional state
//     delete req.session.passport.user.isNewUser; // Optional cleanup

//     if (isNewUser) {
//       res.redirect('http://localhost:3000/SignUp/CompleteProfile');
//     } else {
//       res.redirect('http://localhost:3000/Home');
//     }
//   }
// );

// app.get('/auth/user', (req, res) => {
//   if (req.user) {
//     res.json(req.user);
//   } else {
//     res.status(401).send('Not authenticated');
//   }
// });





app.use('/users', userRoutes);


app.get('/health',hitLimiter, (req, res) => {
    res.status(200).send('API Gateway is up and running!');
  });


  app.listen(process.env.PORT, '0.0.0.0', () => 
    console.log(`Server is listening on port:`, process.env.PORT)
);
