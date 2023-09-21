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
      "user_grades",
      [
        {
          user_id: 1,
          grade_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          grade_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          grade_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          grade_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          grade_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 6,
          grade_id: 3,
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
    await queryInterface.bulkDelete("user_grades", null, {});
  },
};
