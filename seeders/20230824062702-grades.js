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
      "grades",
      [
        {
          school_year_id: 1,
          name: "Kelas X",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          school_year_id: 1,
          name: "Kelas XI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          school_year_id: 1,
          name: "Kelas XII",
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
    await queryInterface.bulkDelete("grades", null, {});
  },
};
