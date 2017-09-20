'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Provincias = sequelize.define('Tipo_Provincias', {
    descripcion: DataTypes.STRING(50)
  }, {
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Provincias.hasMany(models.Tipo_Localidades, {foreignKey:'provincia_id'});
      }
    }
  });
  return Tipo_Provincias;
};
