'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tipo_Localidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provincia_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Tipo_Provincias', key: 'id' },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      },
      descripcion: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tipo_Localidades');
  }
};
