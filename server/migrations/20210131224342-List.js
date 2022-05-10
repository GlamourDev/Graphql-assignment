'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('PostList', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
/*   up: async (queryInterface, Sequelize) => {
    const City = queryInterface.define('ListItems', {
      name: { type: Sequelize.STRING },
      order_: { type: Sequelize.INTEGER }
    });
    City.sync().then(() => {
      City.create({
        name: 'Neuquen',
        order_: 0
      });
      City.create({
        name: 'General Roca',
        order_: 1
      });
    }); */
  /*   return queryInterface.createTable("ListItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }); */
/*   }, */

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('PostList');

  }
};
