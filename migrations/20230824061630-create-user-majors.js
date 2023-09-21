'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_majors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      major_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addIndex("user_majors", ["user_id", "major_id"], {
        name: "user_majors_unique",
        using: "BTREE",
        fields: ["user_id", "major_id"],
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_majors", "user_majors_unique");
    await queryInterface.dropTable('user_majors');
  }
};