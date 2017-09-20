'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Cuentas = sequelize.define('Usuarios_Cuentas', {
    usuario_id: DataTypes.INTEGER,
    email: DataTypes.STRING(100),
    nombre_usuario: DataTypes.STRING(100),
    contrasena: DataTypes.STRING(16),
    nivel_acceso: DataTypes.STRING(30)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Cuentas.belongsTo(models.Usuarios_Datos,{foreignKey:'usuario_id'});
      }
    }
  });
  return Usuarios_Cuentas;
};
