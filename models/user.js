const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userUuid: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  imageURL: {
    type: String,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
  role:{    
    type: String,
    enum: ["Free member", "VIP"],
    default: "Free member",
  },
  rating:{
    type:Number,
    default:250,
  },
  starRating:{
    type:Number,
    default:0,
  },
  totalCalls:{
    type:Number,
    default:0,
  },
  language:{
    type:String,
    enum : ['tamil', 'english', 'hindi' , 'japan', 'korean'] ,
    default : 'english'
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
