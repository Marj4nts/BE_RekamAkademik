"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("user_rayons", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        rayon_id: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addIndex("user_rayons", ["user_id", "rayon_id"], {
          name: "user_rayons_unique",
          using: "BTREE",
          fields: ["user_id", "rayon_id"],
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_rayons", "user_rayons_unique");
    await queryInterface.dropTable("user_rayons");
  },
};
