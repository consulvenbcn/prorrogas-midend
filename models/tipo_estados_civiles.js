'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Estados_Civiles = sequelize.define('Tipo_Estados_Civiles', {
    descripcion: DataTypes.STRING(12)
  }, {
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Estados_Civiles.hasOne(models.Usuarios_Datos, {foreignKey:'estado_civil'});
      }
    }
  });
  return Tipo_Estados_Civiles;
};
