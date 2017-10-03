  module.exports = function(sequelize, DataTypes) {
    var Gallery = sequelize.define("Gallery", {
      
    });
  
    Gallery.associate = function(models) {
      Gallery.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Gallery;
  };