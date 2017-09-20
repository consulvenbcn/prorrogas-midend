'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Localidades = sequelize.define('Tipo_Localidades', {
    provincia_id: DataTypes.INTEGER,
    descripcion: DataTypes.STRING(50)
  }, {
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Localidades.belongsTo(models.Tipo_Provincias,{foreignKey:'provincia_id'});
        Tipo_Localidades.hasOne(models.Usuarios_Local_Direcciones,{foreignKey:'localidad'});
      }
    }
  });
  return Tipo_Localidades;
};
