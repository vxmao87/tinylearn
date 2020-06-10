module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define("userCats", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Category;
};