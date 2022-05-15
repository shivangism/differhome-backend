'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExtraDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carpetArea: {
        type: Sequelize.INTEGER
      },
      priceSqft: {
        type: Sequelize.INTEGER
      },
      reraRegistered: {
        type: Sequelize.BOOLEAN
      },
      parking: {
        type: Sequelize.BOOLEAN
      },
      balcony: {
        type: Sequelize.BOOLEAN
      },
      security: {
        type: Sequelize.BOOLEAN
      },
      about: {
        type: Sequelize.STRING
      },
      projectID: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExtraDetails');
  }
};