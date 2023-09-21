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
      "rombels",
      [
        {
          major_id: 1,
          name: "PPLG X-1",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 8,
          name: "PPLG XI-1",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 15,
          name: "PPLG XII-1",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 1,
          name: "PPLG X-2",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 8,
          name: "PPLG XI-2",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 15,
          name: "PPLG XII-2",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 1,
          name: "PPLG X-3",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 8,
          name: "PPLG XI-3",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 15,
          name: "PPLG XII-3",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 1,
          name: "PPLG X-4",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 8,
          name: "PPLG XI-4",
          token: "randomstring",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          major_id: 15,
          name: "PPLG XII-4",
          token: "randomstring",
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
    await queryInterface.bulkDelete("rombels", null, {});
  },
};
