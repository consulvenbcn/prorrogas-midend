'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios_Documentos', {
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
      tipo_documento: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tipo_Documentos', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      numero_documento: {
        type: Sequelize.STRING(50)
      },
      fecha_emision: {
        type: Sequelize.DATEONLY
      },
      fecha_vencimiento: {
        type: Sequelize.DATEONLY
      },
      lugar_emision: {
        type: Sequelize.STRING(30)
      },
      archivo: {
        type: Sequelize.BLOB
      },
      verificado: {
        allowNull: false,
        type: Sequelize.INTEGER(1),
        default: 0
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
    return queryInterface.dropTable('Usuarios_Documentos');
  }
};
