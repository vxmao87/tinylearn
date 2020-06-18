module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Category;
};
