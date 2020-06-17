"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Programming_languages",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Physics",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Opera",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Puzzles",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Internet",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Magazines",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Photography",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Museums",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "World",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sleep",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Botany",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Animals",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Astronomy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Clothing",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Food_and_drink",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // Add reverting commands here.
    // Return a promise to correctly handle asynchronicity.
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
