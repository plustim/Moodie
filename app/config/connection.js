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

// Exports the connection for other files to use
module.exports = sequelize;
