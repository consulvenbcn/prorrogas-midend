'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Vias = sequelize.define('Tipo_Vias', {
    descripcion: DataTypes.STRING(25)
  }, {
    underscored: true,
    timestamps:false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Vias.hasOne(models.Usuarios_Local_Direcciones,{foreignKey:'tipo_via'})
      }
    }
  });
  return Tipo_Vias;
};
