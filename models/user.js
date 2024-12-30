const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequalize'); 
const bcrypt = require('bcrypt');

const User = sequelize.define(
  'User', // Model name
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    useruuid: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4, // Matches `gen_random_uuid()`
    },
    firstname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    profile_photo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    is_active:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    is_deleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },
  {
    tableName: 'users', // Explicitly map to the existing table
    timestamps: false, // Disable automatic `createdAt` and `updatedAt`
  }
);

User.associate = (models) => {
  User.hasOne(models.Verification, {
    foreignKey: 'useruuid',
    sourceKey: 'useruuid',
  });
};

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
