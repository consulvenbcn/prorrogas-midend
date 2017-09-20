'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tramites_Prorrogas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tramite_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Usuarios_Tramites', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'Cascade'
      },
      documento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Usuarios_Documentos', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      unico_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      estatus: {
        type: Sequelize.INTEGER
      },
      fecha_emision: {
        type: Sequelize.DATEONLY
      },
      fecha_vencimiento: {
        type: Sequelize.DATEONLY
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
    return queryInterface.dropTable('Tramites_Prorrogas');
  }
};
