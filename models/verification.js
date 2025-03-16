const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  userUuid: {
    type: String,
    required: true,
    unique: true, 
  },
  password_hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  
  }
}, { timestamps: true }); 

const VerificationModel = mongoose.model("Verification", verificationSchema);

module.exports = VerificationModel;
