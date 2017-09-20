'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios_Datos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre1: {
        type: Sequelize.STRING(25)
      },
      nombre2: {
        type: Sequelize.STRING(30)
      },
      apellido1: {
        type: Sequelize.STRING(25)
      },
      apellido2: {
        type: Sequelize.STRING(30)
      },
      estado_civil: {
        type: Sequelize.INTEGER,
        references: { model: 'Tipo_Estados_Civiles', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      genero: {
        type: Sequelize.STRING(1)
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY
      },
      lugar_nacimiento: {
        type: Sequelize.STRING(70)
      },
      foto: {
        type: Sequelize.BLOB
      },
      tipo_usuario: {
        type: Sequelize.STRING(1)
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
    return queryInterface.dropTable('Usuarios_Datos');
  }
};
