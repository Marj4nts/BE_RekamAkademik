'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chapter_headers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
      queryInterface.addIndex("chapter_headers", ["chapter_id"], {
        name: "chapter_headers_unique",
        using: "BTREE",
        fields: ["chapter_id"],
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("chapter_headers", "chapter_headers_unique");
    await queryInterface.dropTable('chapter_headers');
  }
};