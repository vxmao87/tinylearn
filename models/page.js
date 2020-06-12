module.exports = function(sequelize, DataTypes) {
    const Page = sequelize.define("userPages", {
        page: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Page.associate = function(models) {
        Page.belongsTo(models.userCats, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Page;
}