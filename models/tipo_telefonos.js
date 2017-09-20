'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Telefonos = sequelize.define('Tipo_Telefonos', {
    descripcion: DataTypes.STRING(10)
  }, {
    underscored: true,
    timestamps:false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Telefonos.hasOne(models.Usuarios_Telefonos,{foreignKey:'tipo_telefono'});
      }
    }
  });
  return Tipo_Telefonos;
};
