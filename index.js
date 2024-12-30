const express = require('express');

const cors = require('cors');
const crypto=require('crypto')
require('dotenv').config()

const app = express();
const session = require('express-session');

const userRoutes=require('./src/user/route')
const hitLimiter =require('./middleware/hitLimiter')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



const userModel=require('./models/user');




app.use(express.json());
app.use(cors());

// app.use(
//   session({
//     secret: 'your-secret-key', // Replace with a strong secret
//     resave: false, // Prevents session from being saved if unmodified
//     saveUninitialized: false, // Prevents saving uninitialized sessions
//     cookie: { secure: false }, // Set `true` if using HTTPS
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Configuration
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if user exists
//         let user = await userModel.findOne({
//           where: { email: profile.emails[0].value },
//         });

//         let newUser=false;

//         if (!user) {
//           // Create new user
//           const data={
//             firstname: profile.displayName,
//             lastname: profile.name.familyName,
//             email: profile.emails[0].value,
//             profile_photo_url: profile.photos[0].value,
//             gender:"other",
//             dob:'1960-01-01',
//             country:"default",
//             password:crypto.randomBytes(32).toString('hex')
//           }

//           console.log(data)
//           user = await userModel.create({
//             firstname: profile.displayName,
//             lastname: profile.name.familyName,
//             email: profile.emails[0].value,
//             profile_photo_url: profile.photos[0].value,
//             gender:'other',
//             dob:'1960-01-01',
//             country:'default',
//             password:crypto.randomBytes(32).toString('hex')
//           });

//           // console.log(user)

//           newUser=true;

//         }
        

//         done(null, { user, newUser });
//       } catch (err) {
//         console.log(err.message)
//         done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id); // Fetch user from database
//     done(null, { user, isNewUser: data.isNewUser });
//   } catch (err) {
//     done(err, null);
//   }
// });

// // Routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     const { isNewUser } = req.user;

//     if (isNewUser) {
//       res.redirect('http://localhost:3000/SignUp/CompleteProfile'); // Redirect new user to "Complete Profile"
//     } else {
//       res.redirect('http://localhost:3000/Home'); // Redirect existing user to "Home"
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


app.listen(process.env.PORT, () => console.log(`Server is listening :`,process.env.PORT))