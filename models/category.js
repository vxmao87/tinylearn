module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define("userCats", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Category.associate = function(models) {
        Category.hasMany(models.userPages, {
            onDelete: "cascade"
        });
    };

    return Category;
};