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
      "majors",
      [
        {
          grade_id: 1,
          name: "PPLG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 1,
          name: "TKJT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 1,
          name: "MPLB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 1,
          name: "DKV",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 1,
          name: "PMN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 1,
          name: "HTL",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 1,
          name: "KLN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "PPLG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "TKJT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "MPLB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "DKV",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "PMN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "HTL",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 2,
          name: "KLN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "PPLG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "TKJT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "MPLB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "DKV",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "PMN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "HTL",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grade_id: 3,
          name: "KLN",
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
    await queryInterface.bulkDelete("majors", null, {});
  },
};
