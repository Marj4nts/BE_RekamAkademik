'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_rombels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      rombel_id: {
        type: Sequelize.INTEGER
      },
      is_alumni: {
        type: Sequelize.BOOLEAN
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
      queryInterface.addIndex("user_rombels", ["user_id", "rombel_id"], {
        name: "user_rombels_unique",
        using: "BTREE",
        fields: ["user_id", "rombel_id"],
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_rombels", "user_rombels_unique");
    await queryInterface.dropTable('user_rombels');
  }
};