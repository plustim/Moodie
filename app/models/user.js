module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        userID: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.SHA1(STRING)
        },
        privacy: {
            type: DataTypes.BOOLEAN
        }

    });
    return User;
};

User.associate = function(models) {
    User.hasMany(models.Gallery, {
      onDelete: "cascade"
    });
};