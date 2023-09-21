'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.TEXT
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
      queryInterface.addIndex("user_notes", ["user_id"], {
        name: "user_notes_unique",
        using: "BTREE",
        fields: ["user_id"],
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_notes", "user_notes_unique");
    await queryInterface.dropTable('user_notes');
  }
};