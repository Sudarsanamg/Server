const { Sequelize } = require('sequelize');
const config=require('../config/config.json')


const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  timezone: dbConfig.timezone,
  dialectOptions: dbConfig.dialectOptions
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ force: false })
    console.log('Connected to PostgreSQL using Sequelize');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
