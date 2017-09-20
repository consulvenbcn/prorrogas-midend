'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios_Tramites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Usuarios_Datos', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      tipo_tramite: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tipo_Tramites', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tipo_Statuses', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      nota: {
        type: Sequelize.TEXT
      },
      archivo: {
        type: Sequelize.BLOB
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
    return queryInterface.dropTable('Usuarios_Tramites');
  }
};
