// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/sequalize');

// const OTPVerificationModel = sequelize.define('otpverification', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     email: {
//         type: DataTypes.STRING(100),
//         allowNull: false,

//     },
//     otp: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     isVerified: {
//         type: DataTypes.ENUM('true', 'false'),
//         defaultValue: 'false',
//         field: 'isverified',
//     },
//     created_at  : {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     },
//     expires_at: {
//         type: DataTypes.DATE,
//         defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '5 minutes'"),
//     },
// }, {
//     tableName: 'otpverification',
//     timestamps: false,
// });

// module.exports = OTPVerificationModel;

const mongoose = require("mongoose");

const OtpVerification = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 5 * 60 * 1000);
    },
  },
});

module.exports = mongoose.model("OtpVerification", OtpVerification);



