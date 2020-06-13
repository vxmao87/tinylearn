'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.
          return queryInterface.bulkInsert("Category", [{
            name: "Mathematics"
          }, {
            name: "Physics"
          }, {
            name: "Opera"
          }, {
            name: "Puzzles"
          }, {
            name: "Internet"
          }, {
            name: "Magazines"
          }, {
            name: "Photography"
          }, {
            name: "Museums"
          }, {
            name: "World"
          }, {
            name: "Sleep"
          }, {
            name: "Botany"
          }, {
            name: "Animals"
          }, {
            name: "Astronomy"
          }, {
            name: "Clothing"
          }, {
            name: "Food_and_drink"
          }]);
        },

  down: (queryInterface, Sequelize) => {
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
      return queryInterface.bulkDelete("Category", null, {});
  }
};
