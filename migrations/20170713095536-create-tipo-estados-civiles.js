'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tipo_Estados_Civiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING(12)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tipo_Estados_Civiles');
  }
};
