"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "rayons",
      [
        {
          name: "Ciawi 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ciawi 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ciawi 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ciawi 4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ciawi 5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cicurug 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cicurug 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cicurug 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },      {
          name: "Cicurug 4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },      {
          name: "Cicurug 5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cicurug 6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },      {
          name: "Cicurug 7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("rayons", null, {});
  },
};
