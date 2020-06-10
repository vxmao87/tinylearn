module.exports = function(sequelize, DataTypes) {
    const Page = sequelize.define("userPages", {
        page: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Page;
}