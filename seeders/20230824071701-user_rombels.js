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
      "user_rombels",
      [
        {
          user_id: 1,
          rombel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          rombel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          rombel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          rombel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          rombel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 6,
          rombel_id: 3,
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
    await queryInterface.bulkDelete("user_rombels", null, {});
  },
};
