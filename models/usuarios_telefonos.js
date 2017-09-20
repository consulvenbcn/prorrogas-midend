'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Telefonos = sequelize.define('Usuarios_Telefonos', {
    usuario_id: DataTypes.INTEGER,
    tipo_telefono: DataTypes.INTEGER,
    numero_telefono: DataTypes.STRING(10)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Telefonos.belongsTo(models.Usuarios_Datos,{foreignKey:'usuario_id'});
        Usuarios_Telefonos.belongsTo(models.Tipo_Telefonos,{foreignKey:'tipo_telefono'});
      }
    }
  });
  return Usuarios_Telefonos;
};
