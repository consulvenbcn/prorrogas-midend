'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios_Parentescos', {
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
      tipo_parentesco: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tipo_Parentescos', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      hijo_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Usuarios_Parentescos');
  }
};
