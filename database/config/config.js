const keys = require('../../config/keys');

module.exports = {
  development: {
    url: keys.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": true
      }
  },
  test: {
    url: keys.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": true
      }
    },
  production: {
    url: keys.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": true
      }
    }
};