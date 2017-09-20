'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios_Local_Direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Usuarios_Datos', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      nombre_via: {
        type: Sequelize.STRING(50)
      },
      numero_via: {
        type: Sequelize.STRING(5)
      },
      tipo_via: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tipo_Vias', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      portal: {
        type: Sequelize.STRING(5)
      },
      escalera: {
        type: Sequelize.STRING(2)
      },
      piso: {
        type: Sequelize.STRING(5)
      },
      puerta: {
        type: Sequelize.STRING(4)
      },
      codigo_postal: {
        type: Sequelize.STRING(8)
      },
      localidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tipo_Localidades', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Usuarios_Local_Direcciones');
  }
};
