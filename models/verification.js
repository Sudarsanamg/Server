const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequalize');

  const Verification = sequelize.define('Verification', {
    useruuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,  // Ensure each user has only one verification record
      primaryKey: true, // Assuming useruuid is the unique identifier
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,  // Store the hashed password
    },
    email:{
        type:DataTypes.STRING(30),
        allowNull:false,
    }
  }, {
    tableName: 'verification',  // Ensures the model is tied to the correct table
    timestamps: false,  // Disable timestamps if you don't need them
  });

  // Define associations if needed
  Verification.associate = (models) => {
    // Assuming `users` model is already defined with a UUID field `useruuid`
    Verification.belongsTo(models.User, {
      foreignKey: 'useruuid',
      targetKey: 'useruuid',
      onDelete: 'CASCADE',  // If a user is deleted, their verification record is also deleted
    });
  };

  module.exports=Verification;


