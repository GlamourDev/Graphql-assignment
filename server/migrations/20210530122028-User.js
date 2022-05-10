'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password: {type: Sequelize.STRING,allowNull: false},
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');

  }
};
