module.exports = function(sequelize, DataTypes) {
	var Gallery = sequelize.define("Gallery", {
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
			len: [1]
			}
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		emotion: {
			type: DataTypes.STRING,
			defaultValue: "none"
		},
		score: {
			type: DataTypes.DECIMAL(7, 3),
			defaultValue: 0
		},
		public: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
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