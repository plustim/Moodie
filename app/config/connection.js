// ====================================================== //
// Initialize mySQL connection.
// ====================================================== //

// Dependencies:
var Sequelize = require("sequelize");

// Creates mySQL connection with Sequelize:
var sequelize = new Sequelize("moodie", "root", "#", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Export connection for other files.
module.exports = sequelize;
