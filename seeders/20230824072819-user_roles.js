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
      "user_roles",
      [
        {
          user_id: 1,
          role_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          role_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          role_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          role_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          role_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 6,
          role_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 7,
          role_id: 1,
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
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
