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
      "user_majors",
      [
        {
          user_id: 1,
          major_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          major_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          major_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          major_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          major_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 6,
          major_id: 15,
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
    await queryInterface.bulkDelete("user_majors", null, {});
  },
};
