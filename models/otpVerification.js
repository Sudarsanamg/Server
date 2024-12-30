const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequalize'); // Ensure this path matches your project's structure

const OTPVerificationModel = sequelize.define('otpverification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.ENUM('true', 'false'),
        defaultValue: 'false',
        field: 'isverified',
    },
    created_at  : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    expires_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '5 minutes'"),
    },
}, {
    tableName: 'otpverification',
    timestamps: false, 
});

module.exports = OTPVerificationModel;
