'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_grades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      grade_id: {
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
      queryInterface.addIndex("user_grades", ["user_id", "grade_id"], {
        name: "user_grades_unique",
        using: "BTREE",
        fields: ["user_id", "grade_id"],
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_grades", "user_grades_unique");
    await queryInterface.dropTable('user_grades');
  }
};