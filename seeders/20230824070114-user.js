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
      "users",
      [
        {
          nis: 12108628,
          name: "Muhammad Yazid Akbar",
          password: helpers.encryptPassword("123456"),
          email: "muhammadyazidakbar@smkwikrama.sch.id",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nis: 12108473,
          name: "Ken Phasa Andaru",
          password: helpers.encryptPassword("123456"),
          email: "kenphasaandaru@smkwikrama.sch.id",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nis: 12108266,
          name: "Abghi Thoriq Al-Baar Suryadi",
          password: helpers.encryptPassword("123456"),
          email: "abghithariqalbaarsuryadi@smkwikrama.sch.id",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nis: 12108356,
          name: "Benediktus Vajra Sagara",
          password: helpers.encryptPassword("123456"),
          email: "benediktusvajrasagara@smkwikrama.sch.id",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nis: 12108453,
          name: "Huntara Fabian Suba",
          password: helpers.encryptPassword("123456"),
          email: "huntarafabiansuba@smkwikrama.sch.id",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nis: 12108393,
          name: "Djalu Galang Sahitya Wijaya",
          password: helpers.encryptPassword("123456"),
          email: "djalugalangsahityawijaya@smkwikrama.sch.id",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin",
          password: helpers.encryptPassword("admin"),
          email: "admin@admin.com",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
