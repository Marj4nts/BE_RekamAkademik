"use strict";

/** @type {import('sequelize-cli').Migration} */
const helpers = require("../helpers/commonHelpers");

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
      "user_rayons",
      [
        {
          user_id: 1,
          rayon_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          rayon_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          rayon_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          rayon_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          rayon_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 6,
          rayon_id: 8,
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
    await queryInterface.bulkDelete("user_rayons", null, {});
  },
};
