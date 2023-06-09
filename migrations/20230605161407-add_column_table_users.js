'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('users', 'password', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }),
    ]),
  down: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn('users', 'password'),
    ]),
};

