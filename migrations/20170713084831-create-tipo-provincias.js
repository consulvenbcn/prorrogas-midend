'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tipo_Provincias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tipo_Provincias');
  }
};
